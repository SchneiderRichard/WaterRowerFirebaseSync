//Must use a local version of waterrower as the npm package has needs updated.
var waterrower = require("./node_modules/node-waterrower/Waterrower/index.js");
var firebase = require("firebase");

var firebaseRoot = "https://waterrowerlog.firebaseio.com/";
var userName = 'RLS';

var firebaseUserRef = new firebase(firebaseRoot + '/' + userName + '/');

var readWaterrower = function() {
  console.log();
  console.log("Stroke Rate ....." + waterrower.readStrokeCount());  // [ - ]
  console.log("Total  ....." + waterrower.readTotalSpeed());   // [cm/s]
  console.log("Average  ..." + waterrower.readAverageSpeed()); // [cm/s]
  console.log("Distance... ....." + waterrower.readDistance());     // [ m ]
  console.log("Heart Rate ......" + waterrower.readHeartRate());    // [ bpm ]

  var timeStamp = new Date().toLocaleString();
  var logEntry = {
    created: timeStamp,
    strokeRate: waterrower.readStrokeCount(),
    total: waterrower.readTotalSpeed(),
    average: waterrower.readAverageSpeed(),
    distance: waterrower.readDistance(),
    heartRate: waterrower.readHeartRate()
  };

  firebaseUserRef.push(logEntry);
};

setInterval(function() {
  readWaterrower();
}, 5000);