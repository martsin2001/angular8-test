import { Component, OnInit } from '@angular/core';
import { Subject, timer, fromEvent, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppService } from './app.service';
import { ConversationFacade } from './redux/conversation.facade';

enum ThemeColor {
  white = 'white',
  black = 'black'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themeColor: ThemeColor = ThemeColor.white;

  private userInfo = { online: false, loggedIn: false };
  private stopPolling$: Subject<boolean> = new Subject();
  private myNumber$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  private userLoggedIn = false;

  constructor(
    private appService: AppService,
    private conversationFacade: ConversationFacade
  ) {}

  ngOnInit() {
    this.initApp();
    this.conversationFacade.loadConverastionById(1);
  }

  changeTheme(color: ThemeColor) {
    this.themeColor = color;
  }

  private initApp() {
    this.addNewNumber();
    this.isUserOnline();
    this.startPolling();
    this.setUserStatus();
    this.isUserLoggedIn();
    this.showNumbersList();
    this.setLoggedInStatus();
  }

  private addNewNumber() {
    this.appService.getNumber().subscribe((n: number) => {
      this.myNumber$.next([...this.myNumber$.value, n]);
    });
  }

  private showNumbersList() {
    timer(0, 2000).subscribe(() => {
      console.log(this.myNumber$.getValue());
    });
  }

  private setUserStatus() {
    fromEvent(window, 'focus').subscribe(event => {
      this.appService.setStatus = true;
    });
    fromEvent(window, 'blur').subscribe(event => {
      this.appService.setStatus = false;
    });
  }

  private setLoggedInStatus() {
    setInterval(() => {
      this.userLoggedIn = !this.userLoggedIn;
      this.appService.isUserLoggedIn$.next(this.userLoggedIn);
    }, 10000);
  }

  private checkUserInfo() {
    if (this.userInfo.loggedIn && this.userInfo.online) {
      console.log('User is online and logged in');
    }
  }

  private isUserLoggedIn() {
    this.appService.isUserLoggedIn$.subscribe(value => {
      this.userInfo.loggedIn = value;
      if (value) {
        this.checkUserInfo();
      }
    });
  }

  private isUserOnline() {
    this.appService.getOnlineStatus().subscribe(online => {
      this.userInfo.online = online;
      if (!!online) {
        this.startPolling();
        this.checkUserInfo();
      } else {
        this.stopPolling();
      }
    });
  }

  private startPolling() {
    timer(0, 2000)
      .pipe(takeUntil(this.stopPolling$))
      .subscribe(() => {
        console.log('Polling is working!');
      });
  }

  private stopPolling() {
    console.log('Polling is stopped!');
    this.stopPolling$.next(true);
  }
}
