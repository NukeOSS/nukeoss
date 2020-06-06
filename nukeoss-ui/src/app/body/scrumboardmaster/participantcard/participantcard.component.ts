import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-participantcard',
  templateUrl: './participantcard.component.html',
  styleUrls: ['./participantcard.component.css']
})
export class ParticipantcardComponent implements OnInit {

  @Input('name') name: string;
  @Input('value') value: string;
  @Input('showParticipantValue') showParticipantValue: boolean;


  dataRecieved = false;
  recievedValue: string;

  constructor() { }

  ngOnInit(): void {

    if (this.value == "0") {
      this.value = "?";
      this.dataRecieved = false;
    } else {
      this.recievedValue = this.value;
      this.value = "#";
      this.dataRecieved = true;
    }
  }

  showData() {
    this.value = this.recievedValue;
  }
}
