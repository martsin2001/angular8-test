import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  LoadConversation,
  ConversationTypes,
  ConversationLoaded,
  ConversationLoadField
} from './conversation.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppService } from '../app.service';
import { Conversation } from '../core/message.interface';

@Injectable()
export class ConversationEffects {
  constructor(private actions$: Actions, private appService: AppService) {}

  @Effect()
  LoadConversation$ = this.actions$.pipe(
    ofType(ConversationTypes.loadConversation),
    switchMap((action: LoadConversation) => {
      return this.appService.loadConversationById(action.payload).pipe(
        map((data: Conversation) => {
          return new ConversationLoaded(data);
        }),
        catchError(err => of(new ConversationLoadField()))
      );
    })
  );
}
