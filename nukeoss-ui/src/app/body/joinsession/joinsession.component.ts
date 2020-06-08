import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joinsession',
  templateUrl: './joinsession.component.html',
  styleUrls: ['./joinsession.component.css']
})
export class JoinsessionComponent implements OnInit {

  error = false
  sessionId: String = ""
  participantName: String = ""
  loadingSpinner = false

  constructor(public functions:AngularFireFunctions, private router: Router) { }

  ngOnInit(): void {
  }

  async onJoinSession() {

    this.loadingSpinner = true;

    console.log(this.sessionId +""+ this.participantName);
    const callable = this.functions.httpsCallable('joinsession');

    try {

      const result = await callable({ sessionId: this.sessionId, participantName: this.participantName }).toPromise();
      console.log("Session joined Successfuly!");

      this.router.navigate(['/ScrumBoardParticipant', this.sessionId, this.participantName]);
    } catch (error) {
      // Getting the Error details.

      error = true;

      var code = error.code;
      var message = error.message;
      var details = error.details;
      // ...

      console.log("Error Code: " + code + "\n Error Message: " + message + "\n Error details: " + details);
    }
  }

}
