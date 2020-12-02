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

self.addEventListener('sync', event => {
  if (event.tag === 'test') {
    event.waitUntil(serverSync());
  }
});

async function serverSync() {
  console.log("initilaced sync");
  function Change() {
      console.log("sync");
      saveNetwork(navigator.connection.type, navigator.onLine);
    }
    function saveNetwork(type, state) {
      var db_network = indexedDB.open("Daten");
      db_network.onsuccess = function(){
        console.log("Speichere Netzwerk");
        var db = db_network.result;
        var tx = db.transaction("Network", "readwrite");
        var store = tx.objectStore("Network");
        store.put({date: getTime().Datum, time: getTime().Uhrzeit, type: type , state: state});
      };
    }

    navigator.connection.addEventListener('typechange', Change);


    //console.log("sync");
    //saveNetwork(navigator.connection.type, navigator.onLine);


  //navigator.connection.addEventListener('typechange', Change);
}
