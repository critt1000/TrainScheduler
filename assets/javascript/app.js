  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKI44IKQR4Bm5y5GmFJIRj9fxzmH7ZXzM",
    authDomain: "trainscheduler-526f0.firebaseapp.com",
    databaseURL: "https://trainscheduler-526f0.firebaseio.com",
    projectId: "trainscheduler-526f0",
    storageBucket: "",
    messagingSenderId: "18012282612"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $('#submitBtn').on('click', function () {
    event.preventDefault();
  
    var trainName;
    var destination;
    var frequency;
    var nextArrival;
    var minutesAway;
    var firstArrival
  
  
  
    trainName = $('#name').val().trim();
    destination = $('#destination').val().trim();
    firstArrival = $('#firstTime').val().trim();
    frequency = $('#frequency').val().trim();
  
    // calc months worked
    var dateFormat = "YYYY-MM-DD";
    var convertedStartDate = moment(startDate, dateFormat);
    monthsWorked = moment().diff(convertedStartDate, "months");
  
    // calc total billed
    var totalBilled = monthsWorked * rate;
  
    // DONE: add to database here -- use .push() instead of .set(), include dateAdded: firebase.database.ServerValue.TIMESTAMP
    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      monthsWorked: monthsWorked,
      rate: rate,
      totalBilled: totalBilled,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  
  });
  
  // add firebase watcher
  database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  
    var sv = snapshot.val();
  
    // DONE: log the data from the database
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.startDate);
    console.log(sv.monthsWorked);
    console.log(sv.rate);
    console.log(sv.totalBilled);
  
    // DONE: push the new stuff to the HTML
    var html =
    '<tr class="something">' +
      '<td>' + sv.name + '</td>' +
      '<td>' + sv.role + '</td>' +
      '<td>' + sv.startDate + '</td>' +
      '<td>' + sv.monthsWorked + '</td>' +
      '<td>$ ' + sv.rate + '</td>' +
      '<td>$ ' + sv.totalBilled + '</td>' +
    '</tr>';
  
    $('#outPutRow').append(html);
  
  }, function (errorObject) {
    console.log("The Read Failed: " + errorObject.code);
  });
