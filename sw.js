//https://developers.google.com/web/fundamentals/primers/service-workers
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './'//,
  //'/styles/main.css',
  //'/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log("cache");
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


import("./DB.js");

function Change() {
  console.log("change");
  saveNetwork(navigator.connection.type, navigator.onLine);
}

navigator.connection.addEventListener('typechange', Change);
