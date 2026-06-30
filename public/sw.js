const CACHE_NAME = 'kahf-day-v2-clear'; // Bump cache name to force activate

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      self.registration.unregister();
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass through all requests directly to network to fix caching issues
  event.respondWith(fetch(event.request));
});
