import { Component, OnInit } from '@angular/core';
import { Theme } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/interfaces/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  themes = Theme;

  constructor(public router: Router, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit(): void {
  }

  loginSuccessful(event: { uid: string; displayName: string }) {
    console.log(event);

    this.cookieService.set('loggedIn', 'true');
    this.cookieService.set('uid', event.uid);
    this.cookieService.set('name', event.displayName);

    this.userService.loggedIn.next(true);

    this.router.navigate(['/']);
  }
}
