const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

"use strict";

//import * as admin from 'firebase-admin';
const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const sessid = require(".//utils");

var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
 databaseURL: "http://localhost:5001"
});

const db = admin.firestore();
const app = express();
exports.app = app;
const main = express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: true }));
main.use('/api/v1', app);
exports.webApi = functions.https.onRequest(main);
app.use(cors())

// Add new prospect  
app.post('/createsession', async (req, res) => {
    const sessionId = sessid.createSessionID();

    const sessionReturn={
        session:sessionId
    };
    res.status(200).send(sessionReturn); 
});

app.get('/createsession', async (req, res) => {
   res.status(400).send('Not Supported'); 
});