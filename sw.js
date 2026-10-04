// Kantoor Woordenschat – Service Worker
// Network-first strateji: önce internetten güncel dosyayı çekmeye çalışır,
// başarısız olursa (çevrimdışıysa) cache'den verir. Böylece kod/kart
// güncellemeleri PWA'da her zaman en güncel haliyle gelir, eski cache
// asılı kalmaz.

const CACHE_NAME = 'woordenschat-v36'; // her güncellemede bu numarayı artır
const REMINDER_CACHE = 'kv-reminder'; // hatırlatma ayarları — silinmez
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
        keys.filter(function(key) { return key !== CACHE_NAME && key !== REMINDER_CACHE; })
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

// ── Günlük hatırlatma (v29) ─────────────────────────────────────────────
// Uygulama ayarları ve "hangi günler çalışıldı" bilgisini kv-reminder
// cache'ine yazar (Service Worker localStorage okuyamaz). Periodic Background
// Sync yalnızca ana ekrana kurulu Android/Chrome'da çalışır; saati tarayıcı seçer.
function readReminder(name) {
  return caches.open(REMINDER_CACHE).then(function(cache) {
    return cache.match(name).then(function(res) { return res ? res.json() : null; });
  }).catch(function() { return null; });
}
function writeReminderState(obj) {
  return caches.open(REMINDER_CACHE).then(function(cache) {
    return cache.put('reminder-state', new Response(JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } }));
  });
}
function localDay() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function maybeSendReminder() {
  return Promise.all([readReminder('reminder-prefs'), readReminder('reminder-state')]).then(function(r) {
    var prefs = r[0], state = r[1] || {};
    if (!prefs || !prefs.enabled) return;
    var today = localDay();
    if (state.lastNotified === today) return;
    var parts = String(prefs.time || '19:00').split(':');
    var target = new Date(); target.setHours(parseInt(parts[0], 10) || 0, parseInt(parts[1], 10) || 0, 0, 0);
    if (Date.now() < target.getTime()) return;
    var studied = Array.isArray(prefs.activeDates) && prefs.activeDates.indexOf(today) !== -1;
    if (prefs.mode === 'idle' && studied) return;
    var due = prefs.dueCount || 0;
    var body = studied
      ? (due ? due + ' kartın tekrar zamanı geldi. Birkaç dakika ayır.' : 'Bugün çalıştın. Birkaç cümleyi sesli tekrar etmeye ne dersin?')
      : (due ? 'Bugün henüz çalışmadın. ' + due + ' kart hatırlanmayı bekliyor.' : 'Bugün henüz çalışmadın. Birkaç kartla seriyi koru.');
    return self.registration.showNotification('Kantoor Woordenschat', {
      body: body, icon: 'icon-192.png', tag: 'kv-daily-reminder', renotify: true, lang: 'tr', data: { url: './index.html' }
    }).then(function() { return writeReminderState({ lastNotified: today }); });
  });
}
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'kv-daily-reminder') event.waitUntil(maybeSendReminder());
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  }));
});
