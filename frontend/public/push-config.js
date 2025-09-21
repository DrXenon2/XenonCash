// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/public/push-config.js
const pushConfig = {
  // Clés VAPID (à récupérer de .env ou générer)
  vapidPublicKey: process.env.VAPID_PUBLIC_KEY || 'your_vapid_public_key',
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY || 'your_vapid_private_key',
  // Options par défaut pour les notifications
  defaultOptions: {
    title: 'XenonCash Notification',
    body: 'You have a new update!',
    icon: '/images/logo.png',
    badge: '/images/notification-icon.png',
    data: { url: '/' },
    actions: [
      { action: 'open', title: 'Open App' },
      { action: 'ignore', title: 'Ignore' },
    ],
  },
  // Endpoint backend pour s’abonner
  subscriptionEndpoint: process.env.NEXT_PUBLIC_BASE_URL + '/api/push/subscribe',
  // Délai de retry pour les notifications (en ms)
  retryDelay: 5000,
  // Limite de retries
  maxRetries: 3,
};

// Fonction utilitaire pour convertir la clé VAPID en Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

pushConfig.applicationServerKey = urlBase64ToUint8Array(pushConfig.vapidPublicKey);

// Export pour usage dans l’app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pushConfig;
}