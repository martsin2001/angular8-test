import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message, Conversation } from './core/message.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isUserOnline$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  conversations: Conversation[] = [
    {
      id: 1,
      name: 'First conversation',
      messages: [
        { message: 'first message of "First conversation"' },
        { message: 'second message of "First conversation"' },
        { message: 'third message of "First conversation"' },
        { message: 'fourth message of "First conversation"' },
        { message: 'fifth message of "First conversation"' },
        { message: 'sixth message of "First conversation"' },
        { message: 'seventh message of "First conversation"' },
        { message: 'eighth message of "First conversation"' }
      ]
    },
    {
      id: 2,
      name: 'Second conversation',
      messages: [
        { message: 'first message of "Second conversation"' },
        { message: 'second message of "Second conversation"' },
        { message: 'third message of "Second conversation"' },
        { message: 'fourth message of "Second conversation"' },
        { message: 'fifth message of "Second conversation"' },
        { message: 'sixth message of "Second conversation"' },
        { message: 'seventh message of "Second conversation"' },
        { message: 'eighth message of "Second conversation"' }
      ]
    },
    {
      id: 3,
      name: 'Third conversation',
      messages: [
        { message: 'first message of "Third conversation"' },
        { message: 'second message of "Third conversation"' },
        { message: 'third message of "Third conversation"' },
        { message: 'fourth message of "Third conversation"' },
        { message: 'fifth message of "Third conversation"' },
        { message: 'sixth message of "Third conversation"' },
        { message: 'seventh message of "Third conversation"' },
        { message: 'eighth message of "Third conversation"' }
      ]
    }
  ];

  constructor() {}

  getOnlineStatus(): Observable<boolean> {
    return this.isUserOnline$.asObservable();
  }

  getNumber(): Observable<number> {
    return timer(0, 500).pipe(map(() => Math.floor(Math.random() * 100)));
  }

  loadConversationData() {
    return this.conversations.map(item => ({ id: item.id, name: item.name }));
  }

  loadConversationById(id: number) {
    return of(this.conversations.find(item => item.id === id));
  }

  set setStatus(status: boolean) {
    this.isUserOnline$.next(status);
  }
}
