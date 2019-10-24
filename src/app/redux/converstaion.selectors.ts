import { createSelector } from '@ngrx/store';
import { getAppState } from './conversation.reducer';

export const getConversation = createSelector(
  getAppState,
  state => state.conversation
);
