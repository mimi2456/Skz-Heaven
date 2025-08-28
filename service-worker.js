const CACHE_NAME = "chan-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/ModeSelect.html",
  "/style.css",
  "/script.js",
  "/Chan.json",
  "/Changbin.json",
  "/All.json",
  "/web.html",
  "/icon-180.png",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});