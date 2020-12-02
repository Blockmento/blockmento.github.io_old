//import("./time.js")

console.log("DB_");

var open = indexedDB.open("Daten");

open.onupgradeneeded = function() {
  console.log("erstelle");
  // The database did not previously exist, so create object stores and indexes.
  var db = open.result;
  var store = db.createObjectStore("Akku", {autoIncrement:true});
  store.createIndex("by_time", "time");
  store.createIndex("by_date", "date");
  store.createIndex("by_level", "level"); //curent level of charging in percent
  store.createIndex("by_state", "state"); //charging/discharging

  var store = db.createObjectStore("Network", {autoIncrement:true});
  store.createIndex("by_time", "time");
  store.createIndex("by_date", "date");
  store.createIndex("by_type", "type"); //type of connection to the Internet (e.g. wifi)
  store.createIndex("by_state", "state"); //online/offline
};

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
  var db_network = indexedDB.open("Daten");
  db_network.onsuccess = function(){
    console.log("Speichere Netzwerk");
    var db = db_network.result;
    var tx = db.transaction("Network", "readwrite");
    var store = tx.objectStore("Network");
    store.put({date: getTime().Datum, time: getTime().Uhrzeit, type: type , state: state});
  };
}

function getData_Akku() {
  var data = indexedDB.open("Daten");
  data.onsuccess = function(){
    var db = data.result;
    var request = db.transaction("Akku").objectStore("Akku");

    request.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      //console.log("curser");
      if (cursor) {
        console.log("ID:" + cursor.key + ", Time:" + cursor.value.time + ", Date:" + cursor.value.date + ", Level:" + cursor.value.level + ", Charging:" + cursor.value.state);
        cursor.continue();
      }
      else {
        console.log("No more entries!");
      }
    };
  };
}

function getData_Network() {
  console.log("Test");
  var data = indexedDB.open("Daten");
  data.onsuccess = function(){
    var db = data.result;
    var request = db.transaction("Network").objectStore("Network");

    request.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      //console.log("curser");
      if (cursor) {
        console.log("ID:" + cursor.key + ", Time:" + cursor.value.time + ", Date:" + cursor.value.date + ", Type:" + cursor.value.type + ", Online:" + cursor.value.state);
        cursor.continue();
      }
      else {
        console.log("No more entries!");
      }
    };
  };
}
/*
open.onsuccess = function(){
  db = open.result;
  var tx = db.transaction("Akku", "readwrite");
  var store = tx.objectStore("Akku");

tx.oncomplete = function() {
  ///db = open.result;
  var tx = db.transaction("Akku", "readonly");
  var store = tx.objectStore("Akku");
  //var index = store.index("by_author");

  //var request = index.openCursor(IDBKeyRange.only("Karl"));
  /*request.onsuccess = function() {
    var matching = request.result;
    if (matching) {
      // A match was found.
      console.log(matching.value.isbn, matching.value.title, matching.value.author);
      matching.continue();
    } else {
      // No match was found.
      //report(null);*****
    }
  };
// All requests have succeeded and the transaction has committed.
};};


  store.put({title: "Dieser Script", author: "Karl", isbn: ""});


   open.onsuccess = function() {
  db = open.result;
  var tx = db.transaction("books", "readonly");
  var store = tx.objectStore("books");
  var index = store.index("by_title");

  var request = index.get("Bedrock Nights");
  request.onsuccess = function() {
    var matching = request.result;
    if (matching !== undefined) {
      // A match was found.
      console.log(matching.isbn, matching.title, matching.author);
    } else {
      // No match was found.
      console.log("Test");
      console.log("Test");
    }
  };
};*/
