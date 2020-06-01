import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrumboardparticipant',
  templateUrl: './scrumboardparticipant.component.html',
  styleUrls: ['./scrumboardparticipant.component.css']
})
export class ScrumboardparticipantComponent implements OnInit {

  sessionId: String

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sessionId'];
  }

}
