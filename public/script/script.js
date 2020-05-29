/*
Copyright (C) 2020
Author: Vivek Kumar<vvksindia@gmail.com>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
version 2 as published by the Free Software Foundation.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

$("#loginBody").ready(function() {
    $("#loginBody").hide(0);
});

$("#signoutBtn").ready(function() {
    $("#signoutBtn").hide(0);
});

$("#loginBtn").click(function() {
    activateUI("login");
});

$("#joinSessionBtn").click(function() {
    activateUI("joinSession");
});

$("#createNewSession").ready(function() {
    $("#createNewSession").hide(0);
});

$("#createNewSessionBtn").click(function() {
    activateUI("createNewSession");
});

function activateUI(activate) {
    $("#createNewSession").fadeOut(0);
    $("#joinSession").fadeOut(0);
    $("#loginBody").fadeOut(0);
    $("#joinSessionBtn").removeClass('active');
    $("#createNewSessionBtn").removeClass('active');

    switch (activate) {
        case "login":
            {
                $("#loginBody").fadeIn(200);
                break;
            }

        case "createNewSession":
            {
                $("#createNewSession").fadeIn(200);
                $("#createNewSessionBtn").addClass('active');
                break;
            }
        case "joinSession":
            {
                $("#joinSession").fadeIn(200);
                $("#joinSessionBtn").addClass('active');
            }
    }

}

$("#createSession").click(function() {
    var selectedSequence = $("#sequenceType option:selected").text();
    var masterName = $("#masterName").val();

    $("#createNewSession").fadeOut(0);
    $("#loadingPage").fadeIn(0);

    var createSession = functions.httpsCallable('createsession');

    createSession({ name: masterName, selectedSequence: selectedSequence }).then(function(result) {
            // Read result of the Cloud Function.
            sessionId = result.data.sessionId;
            console.log("Session ID: " + result.data.sessionId);
            console.log("Session successfully created!");
            loadScrumBoard(sessionId);

            master = true;
        })
        .catch(function(error) {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            // ...

            console.log("Error Code: " + code + "\n Error Message: " + message + "\n Error details: " + details);
        });
});

$("#scrumBoardMaster").ready(function() {
    $("#scrumBoardMaster").hide(0);
});

$("#loadingPage").ready(function() {
    $("#loadingPage").hide(0);
});

function loadScrumBoard(id) {
    $("#scrumBoardMaster").fadeIn(0);
    $("#loadingPage").fadeOut(0);

    $("#sessionId").html(id);

    monitorChanges();
}

$("#startScrum").click(function() {
    var topic = $("#topic").val();
    sendTopic(topic);
});

function sendTopic(topic) {
    resetParticipants();

    db.collection(sessionId).doc("Main").update({
            Topic: topic
        })
        .then(function() {
            console.log("Document successfully written!");
            loadScrumBoard(sessionId);
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

$("#joinSession").click(function() {
    sessionId = $("#joinSessionId").val();
    participantName = $("#participantName").val();

    if (participantName != "" && participantName != null) {
        joinSession();
    }
});

$("#sessionNotFoundError").ready(function() {
    $("#sessionNotFoundError").hide(0);
})

function joinSession() {
    // Adding in the list of participants

    var joinsession = functions.httpsCallable('joinsession');

    joinsession({ sessionId: sessionId, participantName: participantName }).then(function(result) {

        $("#joinSession").fadeOut(0);
        console.log("Session joined Successfuly!");
        monitorChanges();

        // master = true;
        // ...
    }).catch(function(error) {
        // Getting the Error details.
        $("#joinSessionId").addClass('text-danger');
        $("#sessionNotFoundError").fadeIn(100);

        var code = error.code;
        var message = error.message;
        var details = error.details;
        // ...

        console.log("Error Code: " + code + "\n Error Message: " + message + "\n Error details: " + details);
    });
}

$("#scrumBoardParticipant").ready(function() {
    $("#scrumBoardParticipant").hide(0);
});

$("#scrumSequence").ready(function() {
    $("#scrumSequence").hide(0);
});

$("#scrumResponse").ready(function() {
    $("#scrumResponse").hide(0);
});

function monitorChanges() {
    var sequenceType;
    var topic;

    db.collection(sessionId).doc("Main")
        .onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());

            sequenceType = doc.data().Sequence;
            participants = doc.data().Participants;
            topic = doc.data().Topic;

            if (doc.data().MasterName === participantName) {
                master = true;
            }

            console.log(master);

            if (master) {
                $("#scrumBoardMaster").fadeIn(0);
                $("#topic").val(topic);
                $("#sessionId").html(sessionId);

                $("#scrumResponse").fadeIn(100);
                loadParticipants();
            } else {

                resetScrumSequence();

                $("#scrumBoardParticipant").fadeIn(100);
                $("#joinedSessionId").html(sessionId);

                $("#scrumSequence").fadeIn(100);
            }

            if (topic != "" && topic != null) {
                if (master) {
                    loadParticipants();
                } else {
                    $("#currentTopic").html(doc.data().Topic);
                    $("#currentTopicDiv").removeClass('alert-danger').addClass('alert-success');
                    resetScrumSequence();
                }
            }

            if (sequenceType == "Fibonacci Number" && !master) {
                var fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
                for (var i = 0; i < 10; i++) {
                    document.getElementsByClassName("card-title")[i].innerHTML = fibonacciSequence[i];
                }
            }

            if (sequenceType == "Prime Number" && !master) {
                var primeSequence = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
                for (var i = 0; i < 10; i++) {
                    document.getElementsByClassName("card-title")[i].innerHTML = primeSequence[i];
                }
            }

            if (sequenceType == "Number" && !master) {
                for (var i = 0; i < 10; i++) {
                    document.getElementsByClassName("card-title")[i].innerHTML = i + 1;
                }
            }
        });
}

function loadParticipants() {
    var template = "";

    participants.forEach(element => {
        var elementValue = element + "Value";
        var frame = "<div class=\"col text-center\">";
        frame += "<div class=\"card mb-3\" style=\"max-width: 18rem;\" id=" + element + ">";
        frame += "<div class=\"card-header\">" + element + "</div>";
        frame += "<div class=\"card-body text-center text-danger\">";
        frame += "<h5 class=\"card-title\" id=" + elementValue + ">?</h5>";
        frame += "</div>";
        frame += "</div></div>";

        template += frame;
    });

    $("#participantCard").html(template);

    monitorParticipantsResponse();
}

$("#showScrum").ready(function() {
    $("#showScrum").hide(0);
});

function monitorParticipantsResponse() {
    var value = 0;

    participants.forEach(element => {
        db.collection(sessionId).doc(element)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());

                value = doc.data().value;

                if (value != 0) {
                    $("#" + element).addClass('bg-success').addClass('text-light');
                    $("#" + element + "Value").html("#");
                    $("#" + element + "Value").addClass('text-light');
                }
            });
    });

    $("#showScrum").delay(10000).fadeIn(100);
}

function resetParticipants() {
    participants.forEach(element => {
        db.collection(sessionId).doc(element).update({
                value: 0
            })
            .then(function() {
                console.log("Document successfully written!");
                $("#" + element).removeClass('bg-success').removeClass('text-light');
                $("#" + element + "Value").html("?");
                $("#" + element + "Value").removeClass('text-light');
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    });
}

$("#showScrum").click(function() {
    participants.forEach(element => {
        db.collection(sessionId).doc(element)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());

                value = doc.data().value;

                if (value != 0) {
                    $("#" + element + "Value").html(value);
                } else {
                    $("#" + element + "Value").html("#");
                }
            });
    });
});

// cards in participants scrum

$(".card").hover(function() {
    $(this).removeClass('border-warning');
    $(this).addClass('border-success');
}, function() {
    $(this).removeClass('border-success');
    $(this).addClass('border-warning');
});

$(".card").click(function() {

    resetScrumSequence();

    var cardSelected = $(this).html();

    console.log(cardSelected);

    $(this).removeClass('bg-warning');
    $(this).addClass('bg-success');

    var selectedSequenceNumber;

    if (cardSelected[92] != "<" && cardSelected[92] != ">") {
        selectedSequenceNumber = cardSelected[92];
    }

    if (cardSelected[93] != "<" && cardSelected[93] != ">") {
        selectedSequenceNumber = selectedSequenceNumber + "" + cardSelected[93];
    }

    sendSelectedValue(selectedSequenceNumber);
});

function sendSelectedValue(selectedSequenceNumber) {
    db.collection(sessionId).doc(participantName).update({
            value: selectedSequenceNumber
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}

function resetScrumSequence() {
    $(".card").each(function() {
        $(this).removeClass('bg-success');
        $(this).addClass('bg-warning');
    });
}