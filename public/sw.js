self.addEventListener('install', _ => {
    console.log('[Service Worker] Installing...');
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
    console.log('Push received.')
    if (event.data) {
        const data = event.data.json();
        event.waitUntil(self.registration.showNotification(data.title, {
            icon: '/favicon.ico',
            body: data.body,
            data: data.data || { url: '/' },
        }))
    }
})

self.addEventListener('notificationclick', function (event) {
    console.log('Notification click received.')
    event.notification.close()
    event.waitUntil(clients.openWindow(event.data.url || '/'))
});