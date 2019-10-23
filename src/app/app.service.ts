import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './core/message.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isUserOnline$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  messages$: BehaviorSubject<any> = new BehaviorSubject([
    { message: 'first message' },
    { message: 'second message' },
    { message: 'third message' },
    { message: 'fourth message' },
    { message: 'fifth message' },
    { message: 'sixth message' },
    { message: 'seventh message' },
    { message: 'eighth message' }
  ]);

  constructor() {}

  getOnlineStatus(): Observable<boolean> {
    return this.isUserOnline$.asObservable();
  }

  searchMessages(keyword: string): Observable<Message[]> {
    return this.messages$
      .asObservable()
      .pipe(
        map(messages =>
          messages.filter((item: Message) => item.message.includes(keyword))
        )
      );
  }

  getNumber(): Observable<number> {
    return timer(0, 500).pipe(map(() => Math.floor(Math.random() * 100)));
  }

  set setStatus(status: boolean) {
    this.isUserOnline$.next(status);
  }
}
