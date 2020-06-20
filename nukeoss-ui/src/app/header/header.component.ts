import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../interfaces/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  login: boolean = false;
  uid: string;

  private userSubscription: Subscription;

  constructor(public router: Router, public route: ActivatedRoute, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit() {
    // this.loggedIn = this.cookieService.get('loggedIn');

    this.userSubscription = this.userService.loggedIn.subscribe( (isLoggedIn: boolean) => {
      this.login = isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  signOut() {
    this.cookieService.deleteAll();
    this.userService.loggedIn.next(false);
  }
}

