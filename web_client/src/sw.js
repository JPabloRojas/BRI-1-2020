importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { NetworkFirst, StaleWhileRevalidate } = workbox.strategies;

registerRoute(
  ({ request }) => request.destination === 'script',
  new NetworkFirst()
);

registerRoute(
  // Cache style resources, i.e. CSS files.
  ({request}) => request.destination === 'style',
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);
