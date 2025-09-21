// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/public/sw.js
const CACHE_NAME = 'xenoncash-v1';
const urlsToCache = [
  '/',
  '/dashboard',
  '/merchant',
  '/login',
  '/about',
  '/images/logo.png',
  '/images/withdrawal-icon.png',
  '/images/earnings-icon.png',
  '/images/promo-banner.jpg',
  '/styles/globals.css', // Ajuste si tu utilises des CSS statiques
];
// Ajoute dans sw.js après l'event 'notificationclick'
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SEND_NOTIFICATION') {
    const notificationData = event.data.payload || pushConfig.defaultOptions;
    self.registration.showNotification(notificationData.title, notificationData);
  }
});
// Installation du service worker et cache des assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activation du service worker et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Gestion des requêtes avec cache ou réseau
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retourne le cache si disponible, sinon fetch le réseau
        return response || fetch(event.request)
          .then((networkResponse) => {
            // Mise à jour du cache pour la prochaine fois
            if (networkResponse && networkResponse.status === 200) {
              const clonedResponse = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, clonedResponse);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Retourne une page hors ligne si réseau échoue
            return caches.match('/offline.html'); // Crée ce fichier si besoin
          });
      })
  );
});