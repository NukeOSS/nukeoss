import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { SessionData, DataId } from '../../interfaces/SessionInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ParticipantcardComponent } from './participantcard/participantcard.component';

@Component({
  selector: 'app-scrumboardmaster',
  templateUrl: './scrumboardmaster.component.html',
  styleUrls: ['./scrumboardmaster.component.css']
})
export class ScrumboardmasterComponent implements OnInit {

  @ViewChild(ParticipantcardComponent) child: ParticipantcardComponent;

  sessionId = ""
  topic = ""

  sessionsdata: Observable<DataId[]>
  public SessionCollection: AngularFirestoreCollection<SessionData>;

  constructor(public functions:AngularFireFunctions, private route: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sessionId'];

    // this.SessionCollection = this.db.collection<Session>(this.sessionId);
    // this.sessions = this.SessionCollection.valueChanges();

    this.SessionCollection = this.db.collection<SessionData>(this.sessionId);
    this.sessionsdata = this.SessionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SessionData;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  async sendTopic() {
    console.log(this.sessionId +""+ this.topic);
    const callable = this.functions.httpsCallable('sendtopic');

    try {

      const result = await callable({ sessionId: this.sessionId, topic: this.topic }).toPromise();
      console.log("Topic sent Successfuly!");

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

  showValue() {
    this.child.showData()
  }
}
