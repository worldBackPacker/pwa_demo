// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 2
const CACHE_NAME = 'stive'
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html'

self.addEventListener('install', event => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME)
            // Setting {cache: 'reload'} in the new request will ensure that the
            // response isn't fulfilled from the HTTP cache; i.e., it will be from
            // the network.
            await cache.add(new Request(OFFLINE_URL, {
                cache: 'reload'
            }))
        })()
    )
    // Force the waiting service worker to become the active service worker.
    self.skipWaiting()
})



self.addEventListener('fetch', event => {


    event.respondWith(
        (async () => {
            try {
                // // First, try to use the navigation preload response if it's supported.
                // const preloadResponse = await event.preloadResponse
                // if (preloadResponse) {
                //     return preloadResponse
                // }

                // Always try the network first.
                const networkResponse = await fetch(event.request)
                return networkResponse
            } catch (error) {
                // catch is only triggered if an exception is thrown, which is likely
                // due to a network error.
                // If fetch() returns a valid HTTP response with a response code in
                // the 4xx or 5xx range, the catch() will NOT be called.
                console.log('Fetch failed; returning offline page instead.', error)

                const cache = await caches.open(CACHE_NAME)
                const cachedResponse = await cache.match(OFFLINE_URL)
                return cachedResponse
            }
        })()
    )

})