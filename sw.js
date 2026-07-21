// Aysha's Studio — service worker.
// Network-first for page loads so the app is ALWAYS the latest version
// (no more stale/cached copies). Does not cache HTML; other requests pass through.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
