//Must use a local version of waterrower as the npm package has needs updated.
var waterrower = require("./node_modules/node-waterrower/Waterrower/index.js");
var firebase = require("firebase");

var firebaseRoot = "https://waterrowerlog.firebaseio.com/";
var userName = 'RLS';

var firebaseUserRef = new firebase(firebaseRoot + '/' + userName + '/');

function logToConsole(logEntry) {
  console.log();
  console.log("Stroke Rate ....." + logEntry.strokeRate); // [ - ]
  console.log("Total  ....." + logEntry.total);   // [cm/s]
  console.log("Average  ..." + logEntry.average); // [cm/s]
  console.log("Distance... ....." + logEntry.distance);     // [ m ]
  console.log("Heart Rate ......" + logEntry.heartRate);    // [ bpm ]
}

var readWaterrower = function() {
  var timeStamp = new Date().toLocaleString();
  var logEntry = {
    created: timeStamp,
    strokeRate: waterrower.readStrokeCount(),
    total: waterrower.readTotalSpeed(),
    average: waterrower.readAverageSpeed(),
    distance: waterrower.readDistance(),
    heartRate: waterrower.readHeartRate()
  };

  if (logEntry.total > 0) firebaseUserRef.push(logEntry);
  logToConsole(logEntry);
};

setInterval(function() {
  readWaterrower();
}, 10000);

