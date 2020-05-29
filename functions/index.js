const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Create New Session in database

exports.createsession = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        let sessionId = createSessionID();

        let name = request.body.data.name;
        let selectedSequence = request.body.data.selectedSequence;

        let result;

        db.collection(sessionId).doc("Main").set({
                Sequence: selectedSequence,
                MasterName: name,
                Topic: "",
                Participants: []
            })
            .then(() => {
                result = {
                    data: {
                        name: name,
                        sessionId: sessionId
                    }
                };
                console.log(result);

                return response.status(200).send(result);
            })
            .catch(() => {
                console.log(error);
                result = {
                    data: {
                        status: error,
                    }
                };
                return response.status(500).send(result);
            });
    });
});


// Join the session

exports.joinsession = functions.https.onRequest((request, response) => {
    cors(request, response, () => {

        let sessionId = request.body.data.sessionId;
        let participantName = request.body.data.participantName;

        let result;

        db.collection(sessionId).doc("Main").update({
                Participants: admin.firestore.FieldValue.arrayUnion(participantName)
            })
            .then(() => {
                return db.collection(sessionId).doc(participantName).set({
                    value: 0
                });
            })
            .then(() => {
                console.log("Participant created successfully");
                result = {
                    data: {
                        name: participantName,
                        sessionId: sessionId
                    }
                };
                console.log(result);

                return response.status(200).send(result);
            })
            .catch((error) => {
                console.log(error);
                result = {
                    data: {
                        status: result,
                    }
                };
                return response.status(500).send(result);
            });
    });
});

/* Generate the base-62 key*/
const base62 = {
    charset: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        .split(''),
    encode: integer => {
        if (integer === 0) {
            return 0;
        }
        let s = [];
        while (integer > 0) {
            s = [base62.charset[integer % 62], ...s];
            integer = Math.floor(integer / 62);
        }
        return s.join('');
    },
    decode: chars => chars.split('').reverse().reduce((prev, curr, i) =>
        prev + (base62.charset.indexOf(curr) * (62 ** i)), 0)
};

/*Create base-62 based ID with mili second based time*/
function createSessionID() {

    var dateLocal = new Date();
    var miliSec = dateLocal.getTime();
    returnSession = base62.encode(miliSec);
    return returnSession;

}