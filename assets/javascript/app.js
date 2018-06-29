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
    var name = "CatTrain";
    var dest = "KittyLand";
    var arrive = "12:30";
    var freq = "3:00";

    database.ref().on("value", function (snapshot) {
        // name = snapshot.val().name;
        dest = snapshot.val().dest;
        freq = snapshot.val().freq;
        arrive = snapshot.val().arrive;
        console.log(snapshot.val().dest);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


    // function writesData(name, dest, freq, arrive) {
    //     database.ref('Trains/' + name).set({
    //         dest: dest,
    //         freq: freq,
    //         arrive: arrive,
    //     })
    // }

    // writesData();

})