// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/public/sw-config.js
// Ce fichier sert de configuration pour le service worker (à inclure dans le build via Workbox plus tard)
const config = {
  cacheName: 'xenoncash-v1',
  precacheManifest: [
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
  ],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/xenoncash\.com\/api\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 jour
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 jours
        },
      },
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
};

// Export pour usage avec Workbox (à configurer dans next.config.js plus tard)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}