// Aysha's Studio — service worker.
// Network-first for page loads so the app is ALWAYS the latest version
// (no more stale/cached copies). Does not cache HTML; other requests pass through.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    // {cache:'reload'} bypasses the browser's HTTP cache. Without it, GitHub Pages
    // serves `cache-control: max-age=600`, so a plain fetch() could hand back a
    // ten-minute-old app and this worker would think it had fetched the latest.
    e.respondWith(
      fetch(e.request, { cache: 'reload' })
        .catch(() => fetch(e.request))
        .catch(() => caches.match(e.request))
    );
  }
});
