// js/watch.js
const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
const id = params.get('id');
const type = params.get('type') || 'movie';

let currentSeason = 1;
let currentEpisode = 1;
let maxEpisodes = 1;

async function fetchTMDB(endpoint) {
    const url = new URL(`${CONFIG.TMDB_BASE}${endpoint}`);
    url.searchParams.append('api_key', CONFIG.TMDB_API_KEY);
    url.searchParams.append('language', 'he-IL');
    const res = await fetch(url);
    return res.json();
}

async function fetchWatchmode(endpoint, params = {}) {
    const url = new URL(`${CONFIG.WATCHMODE_BASE}${endpoint}`);
    url.searchParams.append('apiKey', CONFIG.WATCHMODE_API_KEY);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    return res.json();
}

async function loadMovie() {
    const it = await fetchTMDB(`/${type}/${id}`);
    
    const backdrop = it.backdrop_path ? `https://image.tmdb.org/t/p/original${it.backdrop_path}` : '';
    const title = it.title || it.name;
    const year = (it.release_date || it.first_air_date || '').split('-')[0];
    const rating = it.vote_average ? it.vote_average.toFixed(1) : 'N/A';
    const genres = it.genres ? it.genres.map(g => g.name).join(', ') : '';
    
    $("#info").innerHTML = `
        <div class="movie-hero" style="background-image: url('${backdrop}')">
            <div class="hero-overlay">
                <div class="hero-content">
                    <h1>${title}</h1>
                    <div class="meta">
                        <span class="match">98% התאמה</span>
                        <span>${year}</span>
                        <span>★ ${rating}</span>
                    </div>
                    <p>${it.overview || 'אין תיאור זמין.'}</p>
                    <p style="color: #aaa; font-size: 0.9rem; margin-bottom: 10px;"><strong>ז'אנר:</strong> ${genres}</p>
                    <div class="hero-buttons">
                        <button class="play-btn" onclick="document.getElementById('playerWrap').scrollIntoView({behavior: 'smooth'})">▶ צפייה</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // הוספת ספקי סטרימינג זמינים (Watchmode)
    try {
        const wmData = await fetchWatchmode(`/title/${it.imdb_id || it.id}/sources/`, { regions: 'US' });
        const sources = wmData || [];
        if(sources.length) {
            const providersHtml = sources.map(p => `<span>${p.name}</span>`).join('');
            $("#info").innerHTML += `<div style="margin-top: 20px;">
                <strong style="color:#fff;">זמין לצפייה ב:</strong> 
                <div class="tags" style="margin-top:8px;">${providersHtml}</div>
            </div>`;
        }
    } catch(e) { console.log("לא נמצאו ספקים"); }

    // כפתורי שרתים
    const servers = type === 'movie' ? CONFIG.SERVERS : CONFIG.SERVERS_TV;
    const serverContainer = $("#serverButtons");
    
    servers.forEach((srv, i) => {
        const btn = document.createElement('button');
        btn.textContent = srv.name;
        btn.onclick = () => {
            serverContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadServer(srv.url);
        };
        if(i === 0) setTimeout(() => btn.click(), 100);
        serverContainer.appendChild(btn);
    });

    // טיפול בסדרות
    if(type === 'tv') {
        $("#seasonEpisodeSelectors").style.display = 'block';
        $("#episodeNav").style.display = 'flex';
        
        const seasonsData = await fetchTMDB(`/tv/${id}`);
        const seasons = seasonsData.seasons.filter(s => s.season_number > 0); 
        
        const seasonContainer = $("#seasonSelectors");
        seasonContainer.innerHTML = ''; 
        
        seasons.forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'season-btn';
            btn.textContent = `עונה ${s.season_number}`;
            btn.onclick = () => {
                seasonContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSeason = s.season_number;
                currentEpisode = 1;
                loadEpisodes(currentSeason);
            };
            if(s.season_number === 1) btn.classList.add('active');
            seasonContainer.appendChild(btn);
        });

        loadEpisodes(1);
    }
}

async function loadEpisodes(seasonNum) {
    const data = await fetchTMDB(`/tv/${id}/season/${seasonNum}`);
    const episodeGrid = $("#episodeGrid");
    episodeGrid.innerHTML = ''; 
    
    maxEpisodes = data.episodes.length;
    
    data.episodes.forEach(e => {
        const epCard = document.createElement('div');
        epCard.className = 'episode-card';
        epCard.id = `ep-card-${e.episode_number}`;
        epCard.innerHTML = `
            <div class="ep-number">${e.episode_number}</div>
            <div class="ep-info">
                <h4>${e.name}</h4>
                <p>${e.overview || 'אין תיאור.'}</p>
            </div>
        `;
        epCard.onclick = () => {
            episodeGrid.querySelectorAll('.episode-card').forEach(c => c.classList.remove('active'));
            epCard.classList.add('active');
            currentEpisode = e.episode_number;
            const activeBtn = $("#serverButtons button.active");
            if(activeBtn) activeBtn.click();
        };
        
        if(e.episode_number === 1) epCard.classList.add('active');
        episodeGrid.appendChild(epCard);
    });
}

function changeEpisode(direction) {
    const newEpisode = currentEpisode + direction;
    if(newEpisode < 1 || newEpisode > maxEpisodes) return;
    
    currentEpisode = newEpisode;
    $("#episodeGrid").querySelectorAll('.episode-card').forEach(c => c.classList.remove('active'));
    const activeCard = $(`#ep-card-${currentEpisode}`);
    if(activeCard) activeCard.classList.add('active');
    
    const activeBtn = $("#serverButtons button.active");
    if(activeBtn) activeBtn.click();
    
    if(activeCard) activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function loadServer(baseUrl) {
    const wrap = $("#playerWrap");
    wrap.innerHTML = ''; 
    
    let url = baseUrl;
    if(type === 'tv') {
        url = `${baseUrl}${id}/${currentSeason}/${currentEpisode}`;
    } else {
        url = `${baseUrl}${id}`;
    }
    
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.allowFullscreen = true;
    wrap.appendChild(iframe);
}

loadMovie();