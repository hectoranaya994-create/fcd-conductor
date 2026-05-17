// ═══════════════════════════════════════════════════════
// FCD — Firebase Messaging Service Worker
// Recibe notificaciones push cuando la app está cerrada
// ═══════════════════════════════════════════════════════
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBdeKYulchRCEmDzdzuNNgU2-jhu0gzku0",
  authDomain: "first-class-drive-dcf90.firebaseapp.com",
  databaseURL: "https://first-class-drive-dcf90-default-rtdb.firebaseio.com",
  projectId: "first-class-drive-dcf90",
  storageBucket: "first-class-drive-dcf90.appspot.com",
  messagingSenderId: "839324333422",
  appId: "1:839324333422:web:fcd00000000000000000"
});

const messaging = firebase.messaging();

// Notificación en background (app cerrada o en otra pestaña)
messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🚗 First Class Drive', {
    body: body || 'Tienes un nuevo mensaje',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    data: payload.data || {},
    actions: [
      { action: 'open', title: 'Ver viaje' },
      { action: 'close', title: 'Cerrar' }
    ]
  });
});

// Al tocar la notificación — abre la app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes('fcd-conductor') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://hectoranaya994-create.github.io/fcd-conductor/');
    })
  );
});
