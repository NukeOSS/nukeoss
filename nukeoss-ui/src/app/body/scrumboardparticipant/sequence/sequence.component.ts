import { Component, OnInit, Input } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit {

  @Input('sequenceType') sequenceType: string;
  @Input('elementIndex') elementIndex: string;
  @Input('sessionId') sessionId: string;
  @Input('participantName') participantName: string;


  sequenceNumber: string
  hovering = false;
  selected = false;

  constructor(public functions:AngularFireFunctions) { }

  ngOnInit(): void {
    if (this.sequenceType == "Fibonacci Number") {
      var fibonacciSequence = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
      this.sequenceNumber = fibonacciSequence[this.elementIndex];
    }

    if (this.sequenceType == "Prime Number") {
      var primeSequence = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      this.sequenceNumber = primeSequence[this.elementIndex];
    }

    if (this.sequenceType == "Number") {
      this.sequenceNumber = this.elementIndex;
    }
  }

  async selectedSequenceNumber() {
    this.selected = true;

    console.log(this.sessionId +":"+ this.participantName +":"+ this.sequenceNumber);

    const callable = this.functions.httpsCallable('sendvalue');

    try {

      const result = await callable({ sessionId: this.sessionId, participantName: this.participantName, number: this.sequenceNumber }).toPromise();
      console.log("value sent Successfuly!");

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
