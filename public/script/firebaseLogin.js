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

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
            document.getElementById("userName").innerHTML = displayName;
          console.log (email);
          console.log (emailVerified);
          console.log (phoneNumber);
          console.log (photoURL);
          console.log (uid);
          console.log (providerData);
          console.log (accessToken);
        });
        $("#loginButton").hide(0);
        $("#signOutButton").show(0);
      } else {
        // User is signed out.
        $("#login").show(0);
        $("#signout").hide(0);
        document.getElementById("userName").innerHTML = "Guest";
      }
    }, function(error) {
      console.log(error);
    });

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
    });
  };

  window.addEventListener('load', function() {
    initApp();
  });

  $("#signout").click(function() {
      firebase.auth().signOut().then(function() {
          console.log("Signed Out");
      });
  });
