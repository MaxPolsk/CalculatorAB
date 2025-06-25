const CACHE_NAME = 'calc-ab-v1';
const urlsToCache = [
  '/CalculatorAB/index.html',
  '/CalculatorAB/',
  '/CalculatorAB/логотип-5.png',
  'https://maxpolsk.github.io/CalculatorAB/icons8-калькулятор-100.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => 
        key !== CACHE_NAME ? caches.delete(key) : null
      ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
