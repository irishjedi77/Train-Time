$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyA2VykWNotkBI3RxbkbP0vIqDhXyF1DIz4",
        authDomain: "erin-s-rad-project.firebaseapp.com",
        databaseURL: "https://erin-s-rad-project.firebaseio.com",
        projectId: "erin-s-rad-project",
        storageBucket: "erin-s-rad-project.appspot.com",
        messagingSenderId: "911102404265"
      };
      firebase.initializeApp(config);

      var database = firebase.database(); 


      $("#submit").on("click", function (event) {
          event.preventDefault(); 
      
       var trainName = $("#train-name").val().trim(); 
       var destination = $("#destination").val().trim(); 
       var trainTime = $("#train-time").val().trim(); 
       var frequency = $("#frequency").val().trim(); 
      
       database.ref().push({
          name: trainName,
          destination: destination,
          arrival: trainTime,
          frequency: frequency
        });
       
      }); 

      database.ref().on("child_added", function(snapshot) { 

        var sv = snapshot.val();
         // Create the new row

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTrainNew = moment(sv.trainTime, "HH:mm").subtract(1, "years");
        console.log(firstTrainNew);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTrainNew), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var remainder = diffTime % frequency;
        console.log(remainder);

        // Minutes Until Train
        var minutesTillTrain = frequency - remainder;
        console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

        // Next Train
        var nextTrain = moment().add(minutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("mm"));
    
         console.log(sv.name)
         console.log(sv.destination)
         console.log(sv.frequency)
         console.log(sv.arrival)
         
    
         var newRow = $("<tr>").append(
            $("<td>").text(snapshot.val().name),
            $("<td>").text(sv.destination),
            $("<td>").text(sv.frequency),
            $("<td>").text(sv.arrival),
            $("<td>").text(nextTrain)
        );
        // Append the new row to the table
        $("#schedule").append(newRow);
    
      
    }); 
    

});
