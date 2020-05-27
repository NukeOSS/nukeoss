/*
Copyright (C) 20202
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

// Your web app's Firebase configuration
var firebaseConfig = {
    // Please Enter Your Firebase Configuration Here.
    apiKey: "AIzaSyCilDU92wZHSgov84nCsjHvHkBaTUEi1q8",
  authDomain: "scrumpoker-3a0ac.firebaseapp.com",
  databaseURL: "https://scrumpoker-3a0ac.firebaseio.com",
  projectId: "scrumpoker-3a0ac",
  storageBucket: "scrumpoker-3a0ac.appspot.com",
  messagingSenderId: "254261994841",
  appId: "1:254261994841:web:a78081d97e0d5550465848",
  measurementId: "G-XK3Y52BFJ0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
callbacks: {
signInSuccessWithAuthResult: function(authResult, redirectUrl) {
// User successfully signed in.
// Return type determines whether we continue the redirect automatically
// or whether we leave that to developer to handle.
return true;
},
uiShown: function() {
// The widget is rendered.
// Hide the loader.
document.getElementById('loader').style.display = 'none';
}
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'popup',
signInSuccessUrl: 'index.html',
signInOptions: [
// Leave the lines as is for the providers you want to offer your users.
{
provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
    ],
},
firebase.auth.EmailAuthProvider.PROVIDER_ID
]
// Terms of service url.
// tosUrl: '<your-tos-url>',
// // Privacy policy url.
// privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Initialize Cloud Firestore through Firebase

var db = firebase.firestore();
var functions = firebase.functions();

var sessionId = 0000;
var participantName = "";
var master = false;
var participants;