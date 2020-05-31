import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinsessionComponent } from './body/joinsession/joinsession.component';
import { CreatenewsessionComponent } from './body/createnewsession/createnewsession.component';
import { LoginComponent } from './body/login/login.component';


const routes: Routes =[
  {path: '', component: JoinsessionComponent},
  {path: 'CreateNewSession', component: CreatenewsessionComponent},
  {path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
