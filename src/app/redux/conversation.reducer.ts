import { ConversationActions, ConversationTypes } from './conversation.action';
import { Conversation } from '../core/message.interface';
import { createFeatureSelector } from '@ngrx/store';

const initialState: ConversationState = {
  conversation: null
};

export interface ConversationState {
  conversation: Conversation;
}

export function ConversationReducer(
  state: ConversationState = initialState,
  action: ConversationActions
) {
  switch (action.type) {
    case ConversationTypes.conversationLoaded: {
      return { conversation: action.payload };
    }
    case ConversationTypes.conversationLoadFailed: {
      return null;
    }
    default:
      return state;
  }
}

export const getAppState = createFeatureSelector<ConversationState>(
  'app-state'
);
