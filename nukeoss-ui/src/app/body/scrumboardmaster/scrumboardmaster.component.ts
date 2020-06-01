import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrumboardmaster',
  templateUrl: './scrumboardmaster.component.html',
  styleUrls: ['./scrumboardmaster.component.css']
})
export class ScrumboardmasterComponent implements OnInit {

  sessionId: String

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sessionId'];
  }
}
