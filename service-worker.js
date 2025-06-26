const CACHE_NAME = 'calculator-v3';
const urlsToCache = [
  '/CalculatorAB/',
  '/CalculatorAB/index.html',
  '/CalculatorAB/icon.png',
  '/CalculatorAB/styles.css',
  '/CalculatorAB/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
});
