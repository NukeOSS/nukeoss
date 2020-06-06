import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionData, DataId } from '../../interfaces/SessionInterface';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-scrumboardparticipant',
  templateUrl: './scrumboardparticipant.component.html',
  styleUrls: ['./scrumboardparticipant.component.css']
})
export class ScrumboardparticipantComponent implements OnInit {

  sessionId: string
  topic: string
  participantName: string

  countArray(n: number): any[] {
    return Array(n);
  }

  sessionsdata: Observable<DataId[]>
  public SessionCollection: AngularFirestoreCollection<SessionData>;

  constructor(private route: ActivatedRoute,  private db: AngularFirestore) { }

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.params['sessionId'];
    this.participantName = this.route.snapshot.params['participantName'];

    this.SessionCollection = this.db.collection<SessionData>(this.sessionId);
    this.sessionsdata = this.SessionCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as SessionData;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
