// Kantoor Woordenschat – Service Worker
// Network-first strateji: önce internetten güncel dosyayı çekmeye çalışır,
// başarısız olursa (çevrimdışıysa) cache'den verir. Böylece kod/kart
// güncellemeleri PWA'da her zaman en güncel haliyle gelir, eski cache
// asılı kalmaz.

const CACHE_NAME = 'woordenschat-v18'; // her güncellemede bu numarayı artır
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-16.png',
  './favicon-32.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // yeni SW'yi bekletmeden hemen devreye al
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim(); // açık sekmelerin kontrolünü hemen al
});

self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // Supabase / Cloudflare Worker isteklerine hiç dokunma
  if (url.includes('supabase.co') || url.includes('workers.dev')) return;

  // HTML ve JSON dosyaları için: önce ağdan dene (güncel kod/kart için),
  // başarısız olursa cache'e düş. Böylece her deploy anında yansır.
  const isAppShell = url.indexOf('.html') !== -1 || url.indexOf('.json') !== -1 || event.request.mode === 'navigate';

  if (isAppShell) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match('./index.html');
        });
      })
    );
  } else {
    // İkonlar gibi değişmeyen dosyalar için cache-first kalır.
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          if (event.request.method === 'GET' && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
      })
    );
  }
});
