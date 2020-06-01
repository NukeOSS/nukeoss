import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnewsession',
  templateUrl: './createnewsession.component.html',
  styleUrls: ['./createnewsession.component.css']
})
export class CreatenewsessionComponent implements OnInit {

  selectedSequence = ""
  masterName = ""
  sessionId = ""

  public createSession: any;

  constructor(public functions:AngularFireFunctions, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSequenceChange(event: any) {
    this.selectedSequence = event.target.value;
  }

  getMasterName(event: any) {
    this.masterName = event.target.value;
  }

  async onCreateSession () {


    console.log(this.selectedSequence);
    console.log(this.masterName);

    const callable = this.functions.httpsCallable('createsession');

    try {

      const result =  await callable({ name: this.masterName, selectedSequence: this.selectedSequence }).toPromise();

      // Read result of the Cloud Function.
      const sessionId = result.sessionId;

      console.log(result);
      console.log("Session ID: " + result.sessionId);

      console.log("Session successfully created!");
      // loadScrumBoard(sessionId);

      const master = true;

      this.router.navigate(['/ScrumBoardMaster', sessionId]);

    } catch (error) {
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      var details = error.details;
      // ...

      console.log("Error Code: " + code + "\n Error Message: " + message + "\n Error details: " + details);
    }
  }
}
