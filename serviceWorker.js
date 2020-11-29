var cacheName = 'cache-v3';

// Files to be served from cache
var files = [
    './',
    './index.html',
    './app.js',
    './manifest.json',
    './images/icon_192.png',
    './images/icon_512.png',
];


self.addEventListener('install', (event) => {
    console.info('Installing Service Worker');
    event.waitUntil(caches.open(cacheName).then((cache) => {
        return cache.addAll(files)
            .then(() => {
                console.info('Sucessfully Cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Failed to cache', error);
            })
    }));
});

self.addEventListener('activate', (event) => {
    console.info('Activating service worker');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) { return caches.delete(cache); }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.info('Event: Fetch');
    var request = event.request;
    event.respondWith(
        // IMPORTANT! CACHING STRATEGY HERE: https://blog.bitsrc.io/5-service-worker-caching-strategies-for-your-next-pwa-app-58539f156f52
        // untuk aplikasi-aplikasi Ubaya yang berbasis PHP, sebaiknya menggunakan network first

        //* // network first: try to fetch response from network. if succeeds, cache the response and return it. ff network fails, it falls back to cache
        fetch(event.request).catch(function() {
            return caches.match(event.request)
        })
        // */

        /* // network only: solely uses the network to fetch and serve the response. does not fallback to any cache
        fetch(event.request).then(function(networkResponse) {
            return networkResponse
        }) // */

        /* // cache only: responds from the cache only. does not fall back to network
        caches.open(cacheName).then(function(cache) {
            cache.match(event.request).then(function(cacheResponse) {
                return cacheResponse;
            })
        })
        // */

        /* // cache first: look for a response in the cache first, if response is found previously cached, then serve the cache. if not found it will fetch the response from network, serve it, and cache it for next time.
        caches.match(request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(request).then((response) => {
                var responseToCache = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(request, responseToCache).catch((err) => {
                        console.warn(request.url + ': ' + err.message);
                    });
                });
                return response;
            });
        }) // */

        /* //
        caches.open(cacheName).then(function(cache) {
            cache.match(event.request).then( function(cacheResponse) {
                fetch(event.request).then(function(networkResponse) {
                    cache.put(event.request, networkResponse)
                })
                return cacheResponse || networkResponse;
            })
        }) 
        // */
    );
});

self.addEventListener('push', (event) => {
    console.info('Event: Push', event);
    event.waitUntil(self.registration.showNotification("test notification", {body: event.body}));
});


self.addEventListener('sync', function(event) {
    console.info('Event: Sync', event);
    // Add logic to send requests to backend when sync happens
    self.registration.showNotification("Syncing Now");
});
