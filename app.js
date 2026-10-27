// js/app.js
const $ = s => document.querySelector(s);
let currentView = 'home';
let searchQuery = '';

async function fetchTMDB(endpoint, params = {}) {
    const url = new URL(`${CONFIG.TMDB_BASE}${endpoint}`);
    url.searchParams.append('api_key', CONFIG.TMDB_API_KEY);
    url.searchParams.append('language', 'he-IL');
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    const res = await fetch(url);
    return res.json();
}

const card = (it, type) => {
    const title = it.title || it.name;
    const poster = it.poster_path ? `${CONFIG.IMG_BASE}${it.poster_path}` : '';
    const rating = it.vote_average ? it.vote_average.toFixed(1) : 'N/A';
    return `<a class="card" href="watch.html?id=${it.id}&type=${type}" style="--poster:#1a1a1a">
        <span class="rate">${rating}</span>
        ${poster ? `<img src="${poster}" alt="${title}" loading="lazy">` : ''}
        <span class="t">${title}</span>
    </a>`;
};

const row = (title, items, type, endpoint, params = {}) => {
    if(!items || !items.length) return "";
    const validItems = items.filter(i => i.poster_path);
    if(!validItems.length) return "";
    const dataAttr = JSON.stringify({ endpoint, params, type, title }).replace(/"/g, '&quot;');
    return `<section class="row">
        <div class="row-head">
            <h2>${title}</h2>
            <a onclick='openSeeAll(${dataAttr})'>ראו הכל ←</a>
        </div>
        <div class="track">${validItems.slice(0, 15).map(it => card(it, type)).join("")}</div>
    </section>`;
};

async function openSeeAll(data) {
    const { endpoint, params, type, title } = data;
    $("#seeAllTitle").textContent = `כל התוצאות עבור: ${title}`;
    $("#seeAllGrid").innerHTML = '<p style="text-align:center; color:#aaa;">טוען...</p>';
    $("#seeAllModal").hidden = false;
    loadSeeAllPage(endpoint, params, type, 1);
}

async function loadSeeAllPage(endpoint, params, type, page) {
    const res = await fetchTMDB(endpoint, { ...params, page });
    const items = res.results.filter(i => i.poster_path);
    const totalPages = res.total_pages || 1;
    $("#seeAllGrid").innerHTML = items.map(it => card(it, type)).join("");
    
    const pagination = $("#pagination");
    pagination.innerHTML = '';
    
    if(page > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'הקודם';
        prevBtn.onclick = () => loadSeeAllPage(endpoint, params, type, page - 1);
        pagination.appendChild(prevBtn);
    }
    
    for(let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === page ? 'active' : '';
        pageBtn.onclick = () => loadSeeAllPage(endpoint, params, type, i);
        pagination.appendChild(pageBtn);
    }
    
    if(page < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'הבא';
        nextBtn.onclick = () => loadSeeAllPage(endpoint, params, type, page + 1);
        pagination.appendChild(nextBtn);
    }
}

function renderProvidersRow() {
    if (!CONFIG.PROVIDERS || !CONFIG.PROVIDERS.length) return "";
    return `<section class="row">
        <div class="row-head"><h2>צפו לפי ספק</h2></div>
        <div class="track provider-track">
            ${CONFIG.PROVIDERS.map(p => `
                <a class="provider-card" href="provider.html?id=${p.id}&name=${encodeURIComponent(p.name)}">
                    <img src="${p.logo}" alt="${p.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="no-logo">${p.name}</div>
                    <span>${p.name}</span>
                </a>
            `).join('')}
        </div>
    </section>`;
}

async function loadHome() {
    $("#rows").innerHTML = '<p class="empty">טוען תוכן...</p>';
    let html = '';

    html += renderProvidersRow();

    const trending = await fetchTMDB(`/trending/all/week`);
    html += row("🔥 טרנדים השבוע", trending.results.filter(i => i.media_type === 'movie'), 'movie', '/trending/all/week');
    
    const popMovies = await fetchTMDB(`/movie/popular`);
    html += row("🎬 סרטים פופולריים", popMovies.results, 'movie', '/movie/popular');
    
    const popTV = await fetchTMDB(`/tv/popular`);
    html += row("📺 סדרות פופולריות", popTV.results, 'tv', '/tv/popular');

    const israeliMovies = await fetchTMDB(`/discover/movie`, { 
        with_original_language: 'he',
        sort_by: 'popularity.desc'
    });
    html += row("🇮🇱 סרטים ישראליים", israeliMovies.results, 'movie', '/discover/movie', { with_original_language: 'he' });

    const israeliTV = await fetchTMDB(`/discover/tv`, { 
        with_original_language: 'he',
        sort_by: 'popularity.desc'
    });
    html += row("🇮🇱 סדרות ישראליות", israeliTV.results, 'tv', '/discover/tv', { with_original_language: 'he' });

    const action = await fetchTMDB(`/discover/movie`, { with_genres: 28 });
    html += row("💥 אקשן", action.results, 'movie', '/discover/movie', { with_genres: 28 });

    const comedy = await fetchTMDB(`/discover/movie`, { with_genres: 35 });
    html += row("😂 קומדיה", comedy.results, 'movie', '/discover/movie', { with_genres: 35 });

    const horror = await fetchTMDB(`/discover/movie`, { with_genres: 27 });
    html += row("👻 אימה", horror.results, 'movie', '/discover/movie', { with_genres: 27 });

    $("#rows").innerHTML = html;
}

async function loadMovies() {
    $("#rows").innerHTML = '<p class="empty">טוען סרטים...</p>';
    let html = '';
    const pop = await fetchTMDB(`/movie/popular`);
    html += row("סרטים פופולריים", pop.results, 'movie', '/movie/popular');
    const top = await fetchTMDB(`/movie/top_rated`);
    html += row("המדורגים ביותר", top.results, 'movie', '/movie/top_rated');
    $("#rows").innerHTML = html;
}

async function loadSeries() {
    $("#rows").innerHTML = '<p class="empty">טוען סדרות...</p>';
    let html = '';
    const pop = await fetchTMDB(`/tv/popular`);
    html += row("סדרות פופולריות", pop.results, 'tv', '/tv/popular');
    const top = await fetchTMDB(`/tv/top_rated`);
    html += row("המדורגות ביותר", top.results, 'tv', '/tv/top_rated');
    $("#rows").innerHTML = html;
}

async function search() {
    if(!searchQuery) return loadHome();
    $("#rows").innerHTML = '<p class="empty">מחפש...</p>';
    const data = await fetchTMDB(`/search/multi`, { query: searchQuery });
    const results = data.results.filter(i => i.media_type !== 'person');
    
    let html = `<section class="row"><div class="row-head"><h2>תוצאות חיפוש עבור: "${searchQuery}"</h2></div>
        <div class="track">${results.map(it => card(it, it.media_type)).join("")}</div></section>`;
        
    $("#rows").innerHTML = html || '<p class="empty">לא נמצאו תוצאות.</p>';
}

$("#nav-home").onclick = (e) => { e.preventDefault(); loadHome(); };
$("#nav-movies").onclick = (e) => { e.preventDefault(); loadMovies(); };
$("#nav-series").onclick = (e) => { e.preventDefault(); loadSeries(); };

$("#searchBtn").onclick = () => {
    const bar = $("#searchbar");
    bar.hidden = !bar.hidden;
    if(!bar.hidden) $("#searchInput").focus();
};

$("#searchInput").oninput = (e) => {
    searchQuery = e.target.value.trim();
    if(searchQuery.length > 2) search();
    else if(searchQuery.length === 0) loadHome();
};

loadHome();
