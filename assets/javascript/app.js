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
    var arrive = "Purr in the Morning";
    var freq = "Right Meow";

    var ref = database.ref('trains');


    $(document).on("click", ".submit", function () {

        ref.push({
            name: ($("#name-input").val().trim()),
            dest: ($("#dest-input").val().trim()),
            arrive: ($("#arrive-input").val().trim()),
            freq: $("#freq-input").val().trim(),
        })

    })

    database.ref().on("value", function(snapshot){
        cycleThrough();
    })

    function cycleThrough() {
        var cycle = database.ref("trains").orderByKey();
        cycle.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();

                    dest = childData.dest;
                    arrive = childData.arrive;
                    freq = childData.freq;
                    name = childData.name;

                    var newTr = $("<tr>");
                    var newTh = $("<th class='left' scope='row'>");
                    newTh.text(name);

                    var destTd = $("<td>").text(dest);
                    var arriveTd = $("<td>").text(arrive);
                    var freqTd = $("<td>").text(freq);
                    var minAway = $("<td>").text("30 minutes");
                    //minAway will equal the next arrival time minus the current time, then displayed on screen

                    newTr.append(newTh)
                    newTr.append(destTd)
                    newTr.append(arriveTd)
                    newTr.append(freqTd);
                    newTr.append(minAway);

                    $(".table-body").append(newTr);
                });
            });
    }
});