importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBdeKYulchRCEmDzdzuNNgU2-jhu0gzku0",
  authDomain: "first-class-drive-dcf90.firebaseapp.com",
  databaseURL: "https://first-class-drive-dcf90-default-rtdb.firebaseio.com",
  projectId: "first-class-drive-dcf90",
  storageBucket: "first-class-drive-dcf90.appspot.com",
  messagingSenderId: "839324333422",
  appId: "1:839324333422:web:743c87d45a2d3533bffd7f"
});

const messaging = firebase.messaging();

// Manejar notificaciones con app en background/cerrada
messaging.onBackgroundMessage((payload) => {
  console.log('📩 Notificación en background:', payload);

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: { url: 'https://hectoranaya994-create.github.io/fcd-conductor/' }
  });
});

// Al hacer click en la notificación — abrir la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://hectoranaya994-create.github.io/fcd-conductor/';
  event.waitUntil(clients.openWindow(url));
});
