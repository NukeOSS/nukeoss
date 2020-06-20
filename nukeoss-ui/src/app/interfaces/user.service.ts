import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class UserService {
  loggedIn = new Subject<boolean>();
}
