const CACHE_NAME = 'administer-v1';
const ASSETS = [
    './',
    './index.html',
    './dashboard.html',
    './estoque.html',
    './vendas.html',
    './financeiro.html',
    './configuracoes.html',
    './css/style.css',
    './js/storage.js',
    './js/auth.js',
    './js/i18n.js',
    './js/utils.js',
    './js/nav.js',
    './js/dashboard.js',
    './js/estoque.js',
    './js/vendas.js',
    './js/financeiro.js',
    './lang/pt-BR.json',
    './lang/en-US.json'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            // Return cached if exists, else fetch network
            return response || fetch(e.request);
        })
    );
});

self.addEventListener('activate', (e) => {
    // Clean old caches
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});
