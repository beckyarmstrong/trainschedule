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

// variable for firebase
var myFirebase = new Firebase('https://www.gstatic.com/firebasejs/4.8.2/firebase.js');

// get information from train form
$("#submit").on('click', function(){
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#firstTrain").val().trim();
  var frequency = $("#frequency").val().trim();
  

//give inforamtion to firebase
  myFirebase.push({
              trainName: trainName,
              destination: destination,
              frequency: frequency,
              trainTime: trainTime
          })
  })

//display information on screen
myFirebase.on('child_added', function(childSnapshot) {
  // find when the next train is and minutes until next train
  var tfrequency = childSnapshot.val().frequency;
  // pushed back 1 year to make sure it comes before current time
  var convertedDate = moment(childSnapshot.val().trainTime, 'hh:mm').subtract(1, 'years');
  var trainTime = moment(convertedDate).format('HH:mm');
  var currentTime = moment();
  // pushed back 1 year to make sure it comes before current time
  var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tfrequency;
  //solved
  var tMinutesTillTrain = tfrequency - tRemainder;
  //solved
  var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')

  //append DOM
  $("#schedule").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" +
  childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency +
  "</td><td>" + trainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>")
  },function(errorObject) {
    console.log('Errors handled: ' + errorObject.code);
  })