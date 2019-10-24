import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ConversationState } from './conversation.reducer';
import { LoadConversation } from './conversation.action';
import { getConversation } from './converstaion.selectors';

@Injectable({ providedIn: 'root' })
export class ConversationFacade {
  conversation$ = this.store.pipe(select(getConversation));

  constructor(private store: Store<ConversationState>) {}

  loadConverastionById(id: number) {
    this.store.dispatch(new LoadConversation(id));
  }
}
