import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createnewsession',
  templateUrl: './createnewsession.component.html',
  styleUrls: ['./createnewsession.component.css']
})
export class CreatenewsessionComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  selectedSequence: string = "1"
  masterName: string
  sessionId: string

  loadingSpinner = false;
  showErrorMessage = false;
  errorMessage = "";

  public createSession: any;

  constructor(public functions:AngularFireFunctions, private router: Router) {
  }

  ngOnInit(): void {
  }

  async onCreateSession () {

    this.loadingSpinner = true;

    console.log(this.selectedSequence);
    console.log(this.masterName);

    if(this.selectedSequence == '1') {
      this.selectedSequence = "Fibonacci Number";
    } else if (this.selectedSequence == "2") {
      this.selectedSequence = "Prime Number";
    } else {
      this.selectedSequence = "Number";
    }

    const callable = this.functions.httpsCallable('createsession');

    try {

      const result =  await callable({ name: this.masterName, selectedSequence: this.selectedSequence }).toPromise();

      // Read result of the Cloud Function.
      const sessionId = result.sessionId;

      console.log(result);
      console.log("Session ID: " + result.sessionId);

      console.log("Session successfully created!");

      this.router.navigate(['/ScrumBoardMaster', sessionId]);

    } catch (error) {
      // Getting the Error details.
      var code = error.code;
      var message = error.message;
      var details = error.details;
      // ...

      this.loadingSpinner = false;
      this.showErrorMessage = true;

      if (message == "internal") {
        message = "Please select sequence and enter your name."
      }
      this.errorMessage = message;

      console.log("Error Code: " + code + "\n Error Message: " + message + "\n Error details: " + details);
    }
  }
}
