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

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || payload.data?.title || 'First Class Drive';
  const body = payload.notification?.body || payload.data?.body || '';
  self.registration.showNotification(title, {
    body,
    icon: 'https://hectoranaya994-create.github.io/fcd-conductor/icon-192.png',
    badge: 'https://hectoranaya994-create.github.io/fcd-conductor/icon-192.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: { url: 'https://hectoranaya994-create.github.io/fcd-conductor/' }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://hectoranaya994-create.github.io/fcd-conductor/';
  event.waitUntil(clients.openWindow(url));
});
