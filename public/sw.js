/* eslint-disable @typescript-eslint/no-unused-vars */
// public/sw.js
// Service Worker for Push Notifications

console.log('Service Worker loading...');

// Install
self.addEventListener('install', (event) => {
    console.log('✅ Service Worker installed');
    self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker activated');
    event.waitUntil(clients.claim());
});

// Handle push notifications
self.addEventListener('push', (event) => {
    console.log('📬 Push notification received:', event);

    if (!event.data) {
        console.log('No data in push event');
        return;
    }

    try {
        const data = event.data.json();
        const { title, message, priority, actionUrl, actionLabel, notificationId } = data;

        const options = {
            body: message,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            tag: `notification-${notificationId}`,
            requireInteraction: priority === 'HIGH' || priority === 'URGENT',
            vibrate: [200, 100, 200],
            data: {
                notificationId,
                actionUrl,
                dateOfArrival: Date.now(),
            },
            actions: actionUrl
                ? [
                    { action: 'open', title: actionLabel || 'View', icon: '/action-open.png' },
                    { action: 'close', title: 'Dismiss', icon: '/action-close.png' },
                ]
                : [],
        };

        event.waitUntil(
            self.registration.showNotification(title || 'OptiluxBD CRM', options)
        );
    } catch (error) {
        console.error('Error showing notification:', error);
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('🖱️ Notification clicked:', event);

    event.notification.close();

    if (event.action === 'close') {
        return;
    }

    const actionUrl = event.notification.data.actionUrl;

    if (actionUrl) {
        event.waitUntil(
            clients
                .matchAll({ type: 'window', includeUncontrolled: true })
                .then((clientList) => {
                    // Check if there's already a window open with the URL
                    for (const client of clientList) {
                        if (client.url.includes(actionUrl) && 'focus' in client) {
                            return client.focus();
                        }
                    }
                    // If not, open a new window
                    if (clients.openWindow) {
                        return clients.openWindow(actionUrl);
                    }
                })
        );
    }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
    console.log('🗑️ Notification dismissed:', event);
});