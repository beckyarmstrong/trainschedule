  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyClkpBbrWEOFIAQ8WxynNQ-pbN7p_41XQU",
    authDomain: "train-schedule-e9041.firebaseapp.com",
    databaseURL: "https://train-schedule-e9041.firebaseio.com",
    projectId: "train-schedule-e9041",
    storageBucket: "train-schedule-e9041.appspot.com",
    messagingSenderId: "602459069841"
  };
  firebase.initializeApp(config);

// Var for firebase
var database = firebase.database();

//Event when submit is clicked
$("#submit").on("click", function(event) {
  event.preventDefault();

// Grab input from user
  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = $("#trainTime-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
// Creates local "temporary" object for holding info
  var newTrain = {
    name: trainName,
    destination: destination,
    time: trainTime,
    frequency: frequency
  };
// Uploads employee data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);
  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#trainTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var loggedName = childSnapshot.val().name;
  var loggedDestination = childSnapshot.val().destination;
  var loggedFrequency = childSnapshot.val().frequency;
  var loggedTime = childSnapshot.val().time;
// Time differnce variables
    var timeDifference = moment().diff(moment.unix(loggedTime), "minutes");
    var timeRemainder = moment().diff(moment.unix(loggedTime), "minutes") % loggedFrequency ;
    var minutesLeft = loggedFrequency - timeRemainder;
    var nextTrain = moment().add(minutesLeft, "m").format("hh:mm A"); 

  // Add each train's data into the table
 $("#trainTable > tbody").append("<tr><td>" + loggedName + "</td><td>" + loggedDestination + "</td><td>" +
  loggedFrequency + "mins" + "</td><td>" + nextTrain + "</td><td>" + minutesLeft +"</td></tr>");
});