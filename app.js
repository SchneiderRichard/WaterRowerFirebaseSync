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
  var averageSpeed;
  try {
    // Want to try accessing the waterrower. If it isn't on or properly
    // connected, a big error will ensue...
    averageSpeed = waterrower.readAverageSpeed();
  }
  catch (ex)
  {
    console.log(ex.message);
    return;
  }

  var timeStamp = new Date().toLocaleString();
  var logEntry = {
    created: timeStamp,
    strokeRate: waterrower.readStrokeCount(),
    total: waterrower.readTotalSpeed(), //instant & flaky. Get rid of?
    average: averageSpeed,
    distance: waterrower.readDistance(),
    heartRate: waterrower.readHeartRate()
  };

  if (logEntry.distance > 0) firebaseUserRef.push(logEntry);
  logToConsole(logEntry);
}

setInterval(function() {
  readWaterRower();
}, _UPDATE_FREQ_MS);

