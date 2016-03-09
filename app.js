// Current npm version of node-waterrower is broken. Use local.
var waterrower = require("./node_modules/node-waterrower/Waterrower/index.js");
var firebase = require("firebase");

var _FIREBASE_ROOT = "https://waterrowerlog.firebaseio.com/";
var _UPDATE_FREQ_MS = 10000;
// TODO: actual user.
var userName = 'RLS';

var firebaseUserRef = new firebase(_FIREBASE_ROOT + '/' + userName + '/');

function logToConsole(logEntry) {
  console.log();
  console.log("Stroke Rate ....." + logEntry.strokeRate); // [ - ]
  console.log("Total  ....." + logEntry.total);   // [cm/s]
  console.log("Average  ..." + logEntry.average); // [cm/s]
  console.log("Distance... ....." + logEntry.distance);     // [ m ]
  console.log("Heart Rate ......" + logEntry.heartRate);    // [ bpm ]
}

function readWaterRower() {
  var timeStamp = new Date().toLocaleString();
  var logEntry = {
    created: timeStamp,
    strokeRate: waterrower.readStrokeCount(),
    total: waterrower.readTotalSpeed(), //instant & flaky. Get rid of?
    average: waterrower.readAverageSpeed(),
    distance: waterrower.readDistance(),
    heartRate: waterrower.readHeartRate()
  };

  if (logEntry.distance > 0) firebaseUserRef.push(logEntry);
  logToConsole(logEntry);
}

setInterval(function() {
  readWaterRower();
}, _UPDATE_FREQ_MS);

