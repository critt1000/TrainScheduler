// Initialize Firebase
var config = {
  apiKey: "AIzaSyAKI44IKQR4Bm5y5GmFJIRj9fxzmH7ZXzM",
  authDomain: "trainscheduler-526f0.firebaseapp.com",
  databaseURL: "https://trainscheduler-526f0.firebaseio.com",
  projectId: "trainscheduler-526f0",
  storageBucket: "trainscheduler-526f0.appspot.com",
  messagingSenderId: "18012282612"
};
firebase.initializeApp(config);

var database = firebase.database();

// Creating Initial Values
var trainName = "";
var destination = "";
var frequency = 0;
var firstArrival = "";
var nextArrival = "";
var minutesAway = 0;

//function that calculates firstArrival and nextArrival
// function calcData() {
//   var difTime = moment().dif(moment(firstArrival), "minutes");
//   var modTime = difTime % frequency;
//   minutesAway = frequency - modTime;
//   nextArrival = moment().add(minutesAway, "minutes");
// }

// Button Click function
$('#submitBtn').on('click', function (event) {
  event.preventDefault();

  //Grab user input and store in variables
  trainName = $('#name').val().trim();
  destination = $('#destination').val().trim();
  frequency = $('#frequency').val().trim();
  firstArrival = $('#firstTime').val().trim();


  // Calculate nextArrival and minutesAway
  var firstArrivalConverted = moment(firstArrival, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstArrivalConverted), "minutes");
  var modTime = diffTime % frequency;
  minutesAway = frequency - modTime;
  nextArrival = moment().add(minutesAway, "minutes");



  // Push Data to Database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    firstArrival: firstArrival,
    minutesAway: minutesAway,
    nextArrival: nextArrival.toLocaleString(),
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// add firebase watcher
database.ref().on("child_added", function (snapshot) {

  var sv = snapshot.val();
  var nextArrivalReformatted = moment(sv.nextArrival).format("HH:mm");

  // DONE: log the data from the database
  console.log(sv.trainName);
  console.log(sv.destination);
  console.log(sv.frequency);
  console.log(sv.nextArrival);
  console.log(sv.minutesAway);
  console.log(sv.firstArrival);

  // Push the new stuff to the HTML
  // Showing an incorrect nextArrival time -------- Needs Rework

  var html =
    '<tr class="something">' +
    '<td>' + sv.trainName + '</td>' +
    '<td>' + sv.destination + '</td>' +
    '<td>' + sv.frequency + '</td>' +
    '<td>' + nextArrivalReformatted + '</td>' +
    '<td>' + sv.minutesAway + '</td>' +
    '<td>' + sv.firstArrival + '</td>' +
    '</tr>';

  $('#outPutRow').append(html);

}, function (errorObject) {
  console.log("The Read Failed: " + errorObject.code);
});
