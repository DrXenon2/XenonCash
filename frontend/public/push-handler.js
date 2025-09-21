// /storage/emulated/0/Documents/XenonCash/XenonCash/frontend/public/push-handler.js
const pushHandler = {
  init: async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration.pushManager.getSubscription()
        .then((subscription) => {
          if (!subscription) {
            const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
            const convertedKey = urlBase64ToUint8Array(vapidPublicKey);
            return registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedKey,
            }).then((newSubscription) => {
              fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/push/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSubscription),
              });
              return newSubscription;
            });
          }
          return subscription;
        });
    }
    return null;
  },
  sendNotification: (title, options = {}) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
          type: 'SEND_NOTIFICATION',
          payload: { title, ...options },
        });
      });
    }
  },
  handlePermission: () => {
    return Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        return pushHandler.init();
      }
      console.log('Notification permission denied.');
      return null;
    });
  },
};

// Fonction utilitaire pour convertir la clé VAPID
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

// Export pour usage dans l’app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pushHandler;
}