const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const admin = require('firebase-admin');
admin.initializeApp();

let db = admin.firestore();

let sessionId = 0;


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createSession = functions.https.onRequest((request, response) => {
    createSessionId();

    // Add a new document in collection "sessionId"
    let result = db.collection(sessionId).doc("Main").set({
        Sequence: "selectedSequence",
        MasterName: request.query.text,
        Topic: "",
        Participants: []
    });

     response.send("ok");
});

function createSessionId()
{
    let today = new Date();
    sessionId = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
}