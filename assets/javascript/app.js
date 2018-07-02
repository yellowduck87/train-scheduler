// Initialize Firebase
$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyBjtSzQnOr_5ely2Slh8T60VJDvuL3CWnw",
        authDomain: "train-scheduler-93ba0.firebaseapp.com",
        databaseURL: "https://train-scheduler-93ba0.firebaseio.com",
        projectId: "train-scheduler-93ba0",
        storageBucket: "",
        messagingSenderId: "187914760507"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var name = "Furry";
    var dest = "KittyLand";
    var firstArrive = "00:00";
    var freq = 0;

    var ref = database.ref('trains');


    $(document).on("click", ".submit", function () {

        ref.push({
            name: ($("#name-input").val().trim()),
            dest: ($("#dest-input").val().trim()),
            arrive: ($("#arrive-input").val().trim()),
            freq: $("#freq-input").val().trim(),
        })

    })

    // dataRef = database.ref("trains/");

    var cycle = database.ref("trains").orderByChild("name");
    cycle.on("child_added", function (childSnapshot) {


        // var key = childSnapshot.key;
        // console.log("current " + moment(currentTime).format("hh:mm"))

        dest = childSnapshot.val().dest;
        firstArrive = childSnapshot.val().arrive;
        freq = parseInt(childSnapshot.val().freq);
        name = childSnapshot.val().name;
        // console.log(firstArrive)

        var convFormat = "HH:mm";
        var currentTime = moment();
    
        // freq = 20;
        // firstArrive = "14:00";
    
        var firstC = moment(firstArrive, "HH:mm").subtract(1, "years");
        console.log("current " + moment(currentTime).format("hh:mm"))
    
    
        console.log("converted" + firstC);
        var diffTime = moment().diff(moment(firstC), "minutes");
        console.log("difference: " + diffTime)
    
        var remainder = diffTime % parseInt(freq);
    
        var minutesNextTrain = parseInt(freq) - remainder;
        console.log("minutes till next: " + minutesNextTrain);
    
        var nextTrain = moment().add(minutesNextTrain, "minutes");
        var nextFormated = moment(nextTrain).format("hh:mm")

        // //calculate minutes away

        var newTr = $("<tr>");
        var newTh = $("<th class='left' scope='row'>");
        newTh.text(name);

        var destTd = $("<td>").text(dest);
        var arriveTd = $("<td>").text(nextFormated);
        var freqTd = $("<td>").text(freq);
        var minAway = $("<td>").text(minutesNextTrain);
        //minAway will equal the next arrival time minus the current time, then displayed on screen

        newTr.append(newTh)
        newTr.append(destTd)
        newTr.append(arriveTd)
        newTr.append(freqTd);
        newTr.append(minAway);

        $(".table-body").append(newTr);
    });



    //calculate minutes away

});