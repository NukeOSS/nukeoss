import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinsessionComponent } from './body/joinsession/joinsession.component';
import { CreatenewsessionComponent } from './body/createnewsession/createnewsession.component';
import { LoginComponent } from './body/login/login.component';
import { ScrumboardmasterComponent } from './body/scrumboardmaster/scrumboardmaster.component';
import { ScrumboardparticipantComponent } from './body/scrumboardparticipant/scrumboardparticipant.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes =[
  {path: '', component: JoinsessionComponent},
  {path: 'CreateNewSession', component: CreatenewsessionComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'ScrumBoardMaster/:sessionId', component: ScrumboardmasterComponent},
  {path: 'ScrumBoardParticipant/:sessionId/:participantName', component: ScrumboardparticipantComponent},
  {path: 'Header', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
