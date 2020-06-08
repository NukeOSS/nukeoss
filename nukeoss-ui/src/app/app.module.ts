import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { JoinsessionComponent } from './body/joinsession/joinsession.component';
import { CreatenewsessionComponent } from './body/createnewsession/createnewsession.component';
import { LoginComponent } from './body/login/login.component';
import { ScrumboardparticipantComponent } from './body/scrumboardparticipant/scrumboardparticipant.component';
import { ScrumboardmasterComponent } from './body/scrumboardmaster/scrumboardmaster.component';
import { CommonModule } from '@angular/common';
import { ParticipantcardComponent } from './body/scrumboardmaster/participantcard/participantcard.component';
import { SequenceComponent } from './body/scrumboardparticipant/sequence/sequence.component';
import { LoadingspinnerComponent } from './body/loadingspinner/loadingspinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    JoinsessionComponent,
    CreatenewsessionComponent,
    LoginComponent,
    ScrumboardparticipantComponent,
    ScrumboardmasterComponent,
    ParticipantcardComponent,
    SequenceComponent,
    LoadingspinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
