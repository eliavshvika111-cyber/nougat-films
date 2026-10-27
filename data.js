// js/data.js
window.CONFIG = {
    TMDB_API_KEY: 'fd8bdd4da2fcbdca299234bf034d7b2f',
    OS_API_KEY: 'avO1OFXevEJDJoob7LUiPEm6ENLkOIGE',
    STREAMING_API_KEY: 'motn-key-v4-9zP4CS7WPPfsgLNWY0LL1J4yBE5lTFSg',
    STREAMING_BASE: 'https://api.movieofthenight.com/v4',
    TMDB_BASE: 'https://api.themoviedb.org/3',
    IMG_BASE: 'https://image.tmdb.org/t/p/w500',
    
    WATCHMODE_API_KEY: 'qNmVNTEiPcmLSiVBV5aEnvelnw0PMaCsfRFK7KHc',
    WATCHMODE_BASE: 'https://api.watchmode.com/v1',
    
    SERVERS: [
        { name: 'Server 1', url: 'https://vidfast.pro/movie/' },
        { name: 'Server 2', url: 'https://vidlink.pro/movie/' },
        { name: 'Server 3', url: 'https://vidsrc.to/embed/movie/' },
        { name: 'Server 4', url: 'https://vidsrc.pm/embed/movie/' },
        { name: 'Server 5', url: 'https://2embed.cc/embed/' },
        { name: 'Server 6', url: 'https://autoembed.co/movie/tmdb/' },
        { name: 'Server 7', url: 'https://embed.su/embed/movie/' },
        { name: 'Server 8', url: 'https://multiembed.mov/?video_id=' },
        { name: 'Server 9', url: 'https://vidsrc.rip/embed/movie/' },
        { name: 'Server 10', url: 'https://vidsrc.me/embed/movie/' },
        { name: 'Server 11', url: 'https://vidsrc.in/embed/movie/' },
        { name: 'Server 12', url: 'https://vidsrc.xyz/embed/movie/' },
        { name: 'Server 13', url: 'https://embed.su/embed/movie/' },
        { name: 'Server 14', url: 'https://2embed.to/embed/movie/' },
        { name: 'Server 15', url: 'https://moviesapi.club/movie/' }
    ],

    SERVERS_TV: [
        { name: 'Server 1', url: 'https://vidfast.pro/tv/' },
        { name: 'Server 2', url: 'https://vidlink.pro/tv/' },
        { name: 'Server 3', url: 'https://vidsrc.to/embed/tv/' },
        { name: 'Server 4', url: 'https://vidsrc.pm/embed/tv/' },
        { name: 'Server 5', url: 'https://2embed.cc/embedtv/' },
        { name: 'Server 6', url: 'https://autoembed.co/tv/tmdb/' },
        { name: 'Server 7', url: 'https://embed.su/embed/tv/' },
        { name: 'Server 8', url: 'https://multiembed.mov/?video_id=' },
        { name: 'Server 9', url: 'https://vidsrc.rip/embed/tv/' },
        { name: 'Server 10', url: 'https://vidsrc.me/embed/tv/' },
        { name: 'Server 11', url: 'https://vidsrc.in/embed/tv/' },
        { name: 'Server 12', url: 'https://vidsrc.xyz/embed/tv/' },
        { name: 'Server 13', url: 'https://embed.su/embed/tv/' },
        { name: 'Server 14', url: 'https://2embed.to/embed/tv/' },
        { name: 'Server 15', url: 'https://moviesapi.club/tv/' }
    ],

    PROVIDERS: [
        { id: 8, name: 'Netflix', logo: 'https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg' },
        { id: 9, name: 'Amazon Prime Video', logo: 'https://image.tmdb.org/t/p/original/emthp39XA2YScoYL1p0sdbAH2WA.jpg' },
        { id: 337, name: 'Disney Plus', logo: 'https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg' },
        { id: 350, name: 'Apple TV+', logo: 'https://image.tmdb.org/t/p/original/49dfh0w7l3n65e6p8b5y156k5z6.jpg' },
        { id: 2, name: 'Apple TV', logo: 'https://image.tmdb.org/t/p/original/q6tl6IbWk5FTZT064s8O4lCgQ6g.jpg' },
        { id: 15, name: 'Hulu', logo: 'https://image.tmdb.org/t/p/original/pqUTCleNUiTLAVlelGxUgWn1ELh.jpg' },
        { id: 1899, name: 'HBO Max', logo: 'https://image.tmdb.org/t/p/original/jbe4gVSfRlbPTdESXhEKpornsfu.jpg' },
        { id: 531, name: 'Paramount Plus', logo: 'https://image.tmdb.org/t/p/original/5GEbAhFW2S5T8zVc1MNvz00pIzM.jpg' },
        { id: 386, name: 'Peacock', logo: 'https://image.tmdb.org/t/p/original/8XZI9QZ7mRZf5gOjiC4p7p658H9.jpg' },
        { id: 283, name: 'Crunchyroll', logo: 'https://image.tmdb.org/t/p/original/mU8o39b5n3o3a61k72o9182k.jpg' },
        { id: 43, name: 'Starz', logo: 'https://image.tmdb.org/t/p/original/gQ9nCq1vG9j5y2l7Z3q1m8618.jpg' },
        { id: 528, name: 'AMC+', logo: 'https://image.tmdb.org/t/p/original/f7Z3j2W3l7q6q5l4.jpg' },
        { id: 538, name: 'MGM Plus', logo: 'https://image.tmdb.org/t/p/original/p1Wp6v2s5j67q5k3.jpg' },
        { id: 257, name: 'FuboTV', logo: 'https://image.tmdb.org/t/p/original/g6H1Z8s5j61z2z1.jpg' },
        { id: 73, name: 'Tubi TV', logo: 'https://image.tmdb.org/t/p/original/s4K8n0l87j67j65.jpg' }
    ]
};

window.SUB_LANGS = {
    he: "עברית", en: "English", ar: "العربية", ru: "Русский", es: "Español", fr: "Français",
    de: "Deutsch", it: "Italiano", pt: "Português", tr: "Türkçe", zh: "中文", ja: "日本語",
    ko: "한국어", hi: "हिन्दी", pl: "Polski", nl: "Nederlands", sv: "Svenska", uk: "Українська",
    fa: "فارسی", th: "ไทย", id: "Indonesia", el: "Ελληνικά", ro: "Română", hu: "Magyar",
    cs: "Čeština", da: "Dansk", fi: "Suomi", no: "Norsk", bg: "Български", hr: "Hrvatski",
    sr: "Српски", sl: "Slovenščina", sk: "Slovenčina", lt: "Lietuvių", lv: "Latviešu",
    et: "Eesti", vi: "Tiếng Việt", ms: "Bahasa Melayu", tl: "Filipino", bn: "বাংলা",
    ta: "தமிழ்", te: "తెలుగు", ml: "മലയാളം", kn: "ಕನ್ನಡ", gu: "ગુજરાતી", pa: "ਪੰਜਾਬੀ",
    ur: "اردو", sw: "Kiswahili", am: "አማርኛ", af: "Afrikaans", sq: "Shqip", hy: "Հայերեն",
    az: "Azərbaycan", be: "Беларуская", bs: "Bosanski", eu: "Euskara", ka: "ქართული",
    kk: "Қазақ", ky: "Кыргызча", mk: "Македонски", mn: "Монгол", ne: "नेपाली", si: "සිංහල"
};

window.GENRES = [
    { id: "popular", name: "פופולרי", ic: "🔥" },
    { id: "top", name: "המדורגים ביותר", ic: "★" },
    { id: "upcoming", name: "בקרוב", ic: "🎬" },
    { id: "now_playing", name: "עכשיו בקולנוע", ic: "🍿" },
    { id: "28", name: "אקשן", ic: "✊" },
    { id: "12", name: "הרפתקאות", ic: "🗺️" },
    { id: "16", name: "אנימציה", ic: "🖌" },
    { id: "35", name: "קומדיה", ic: "😄" },
    { id: "80", name: "פשע", ic: "🕵️" },
    { id: "99", name: "דוקומנטרי", ic: "📖" },
    { id: "18", name: "דרמה", ic: "🎭" },
    { id: "10751", name: "משפחה", ic: "👨‍👩‍👧‍👦" },
    { id: "14", name: "פנטזיה", ic: "🧙" },
    { id: "36", name: "היסטוריה", ic: "🏛️" },
    { id: "27", name: "אימה", ic: "👻" },
    { id: "10402", name: "מוזיקה", ic: "🎵" },
    { id: "9648", name: "מסתורין", ic: "🔍" },
    { id: "10749", name: "רומנטיקה", ic: "❤" },
    { id: "878", name: "מדע בדיוני", ic: "🚀" },
    { id: "10770", name: "סרט טלוויזיה", ic: "📺" },
    { id: "53", name: "מתח", ic: "😰" },
    { id: "10752", name: "מלחמה", ic: "⚔️" },
    { id: "37", name: "מערבון", ic: "🤠" }
];