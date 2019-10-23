import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isUserOnline$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  getOnlineStatus() {
    return this.isUserOnline$;
  }

  set setStatus(status: boolean) {
    this.isUserOnline$.next(status);
  }
}
