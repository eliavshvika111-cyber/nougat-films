const $ = s => document.querySelector(s);
const params = new URLSearchParams(location.search);
const providerId = params.get('id');
const providerName = params.get('name');

// מיפוי המזהה המספרי של TMDB למזהה של Watchmode
const providerMap = {
    '8': 203,   // Netflix
    '9': 26,    // Amazon Prime
    '337': 372, // Disney+
    '1899': 1899, // HBO Max
    '15': 157,  // Hulu
    '531': 444, // Paramount+
    '386': 387, // Peacock
    '283': 283, // Crunchyroll
    '43': 43,   // Starz
    '73': 73    // Tubi
};

async function fetchTMDB(endpoint, params = {}) {
    const url = new URL(`${CONFIG.TMDB_BASE}${endpoint}`);
    url.searchParams.append('api_key', CONFIG.TMDB_API_KEY);
    url.searchParams.append('language', 'he-IL');
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
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

// חיפוש סרט ב-TMDB לפי שם
async function searchTMDB(title, type) {
    const endpoint = type === 'movie' ? '/search/movie' : '/search/tv';
    const data = await fetchTMDB(endpoint, { query: title });
    if (data.results && data.results.length > 0) {
        return data.results[0];
    }
    return null;
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

async function loadProviderContent() {
    $("#rows").innerHTML = `<p class="empty">טוען תוכן עבור ${providerName}...</p>`;
    
    const sourceId = providerMap[providerId];
    if (!sourceId) {
        $("#rows").innerHTML = `<p class="empty">ספק זה אינו נתמך כרגע.</p>`;
        return;
    }

    try {
        // משיכת רשימת הסרטים הפופולריים מ-TMDB
        const tmdbData = await fetchTMDB('/movie/popular', { page: 1 });
        const movies = tmdbData.results || [];

        if(!movies.length) {
            $("#rows").innerHTML = `<p class="empty">לא נמצא תוכן.</p>`;
            return;
        }

        // סינון הסרטים שזמינים בספק (לפי Watchmode)
        const validItems = [];
        for (const movie of movies.slice(0, 20)) {
            try {
                const wmData = await fetchWatchmode(`/title/${movie.id}/sources/`, { regions: 'US' });
                const sources = wmData || [];
                const hasProvider = sources.some(s => s.source_id === sourceId);
                if (hasProvider) {
                    validItems.push({ ...movie, type: 'movie' });
                }
            } catch(e) {
                // אם יש שגיאה, פשוט נדלג על הסרט הזה
            }
        }

        if(!validItems.length) {
            // אם לא נמצאו סרטים תואמים, פשוט נציג את הסרטים הפופולריים
            $("#rows").innerHTML = `<p class="empty">לא נמצא תוכן תואם ל-${providerName}. מציג סרטים פופולריים.</p>` + 
                `<section class="row"><div class="row-head"><h2>סרטים פופולריים</h2></div>
                <div class="track">${movies.slice(0, 15).map(it => card(it, 'movie')).join("")}</div></section>`;
            return;
        }

        let html = `<section class="row">
            <div class="row-head"><h2>תוכן ב-${providerName}</h2></div>
            <div class="track">${validItems.map(it => card(it, it.type)).join("")}</div>
        </section>`;
        
        $("#rows").innerHTML = html;

    } catch (e) {
        console.error(e);
        $("#rows").innerHTML = `<p class="empty">שגיאה בטעינת הנתונים.</p>`;
    }
}

loadProviderContent();