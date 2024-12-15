// Saat service worker diinstal, cache file yang diperlukan
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
        '/',              // Halaman utama
        '/Pengelola File IndexedDB/index.html',    // Halaman index
        '/',     // File CSS (jika ada)
        '/Pengelola File IndexedDB/service-worker.js',     // File JavaScript (jika ada)
        '/'       // Gambar (jika ada)
      ]);
    })
  );
});

// Saat service worker diaktifkan, hapus cache lama jika ada
self.addEventListener('activate', event => {
  const cacheWhitelist = ['my-cache']; // Daftar cache yang boleh tetap ada
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Menghapus cache yang tidak digunakan
          }
        })
      );
    })
  );
});

// Mencegat permintaan jaringan dan mengembalikan data dari cache atau jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request); // Kembalikan data dari cache atau ambil dari jaringan
    })
  );
});