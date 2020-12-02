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


function getTime(){
  var time=new Date(); //gats the Date and Time in utc
  var today=new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, ''); //sets the Time to the users timezone
  var Datum = today.slice(0,10).replace(/-/g,"."); //gets only the Parts for Date/Time
  var Uhrzeit = today.slice(11,19);
  return {Datum, Uhrzeit,}
}

function Change() {
  console.log("change");
  saveNetwork(navigator.connection.type, navigator.onLine);
}

navigator.connection.addEventListener('typechange', Change);

navigator.getBattery().then(function (battery) { //opens stream to Battery API

function Change() {
  console.log("change");
  saveAkku(battery.level, battery.charging);
  }

battery.addEventListener('chargingchange', Change);
battery.addEventListener('levelchange', Change);

console.log(battery.level);

//store.clear();

//saveAkku(battery.level, battery.charging)

});

function saveAkku(level, state) {
  var db_akku = indexedDB.open("Daten");
  db_akku.onsuccess = function(){
    console.log("Speichere Akku");
    var db = db_akku.result;
    var tx = db.transaction("Akku", "readwrite");
    var store = tx.objectStore("Akku");
    store.put({date: getTime().Datum, time: getTime().Uhrzeit, level: level , state: state});
  };
}

function saveNetwork(type, state) {
  var db_akku = indexedDB.open("Daten");
  db_akku.onsuccess = function(){
    console.log("Speichere Netzwerk");
    var db = db_akku.result;
    var tx = db.transaction("Network", "readwrite");
    var store = tx.objectStore("Network");
    store.put({date: getTime().Datum, time: getTime().Uhrzeit, type: type , state: state});
  };
}
