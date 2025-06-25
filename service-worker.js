const CACHE_NAME = "calc-ab-v1";
const urlsToCache = [
  "/CalculatorAB/index.html",
  "/CalculatorAB/styles.css",
  "/CalculatorAB/script.js",
  "/CalculatorAB/icons/icon-192x192.png",
  "/CalculatorAB/icons/icon-512x512.png"
];

// Установка Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Активация и очистка старых кэшей
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => 
        key !== CACHE_NAME ? caches.delete(key) : null
      ))
    )
  );
});

// Обработка запросов
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request))
  );
});
