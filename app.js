//Must use a local version of waterrower as the npm package has needs updated.
var waterrower = require("./node_modules/node-waterrower/Waterrower/index.js");
var firebase = require("firebase");
var myFirebaseRef = new firebase("https://boiling-torch-2948.firebaseio.com/");

var readWaterrower = function() {
  console.log();
  console.log("Stroke Rate ....." + waterrower.readStrokeCount());  // [ - ]
  console.log("Total  ....." + waterrower.readTotalSpeed());   // [cm/s]
  console.log("Average  ..." + waterrower.readAverageSpeed()); // [cm/s]
  console.log("Distance... ....." + waterrower.readDistance());     // [ m ]
  console.log("Heart Rate ......" + waterrower.readHeartRate());    // [ bpm ]

  var logEntry = {
    userName: 'RLS',
    created: new Date().toLocaleString(),
    strokeRate: waterrower.readStrokeCount(),
    total: waterrower.readTotalSpeed(),
    average: waterrower.readAverageSpeed(),
    distance: waterrower.readDistance(),
    heartRate: waterrower.readHeartRate()
  };

  myFirebaseRef.set(logEntry);
  myFirebaseRef.push(logEntry);
};

setInterval(function() {
  readWaterrower();
}, 5000);