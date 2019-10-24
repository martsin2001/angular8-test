import { Action } from '@ngrx/store';
import { Conversation } from '../core/message.interface';

export enum ConversationTypes {
  loadConversation = '[Conversation] load conversation',
  conversationLoaded = '[Conversation] conversation loaded',
  conversationLoadFailed = '[Conversation] conversation load failed'
}

export class LoadConversation implements Action {
  readonly type = ConversationTypes.loadConversation;
  constructor(public payload: number) {}
}

export class ConversationLoaded implements Action {
  readonly type = ConversationTypes.conversationLoaded;
  constructor(public payload: Conversation) {}
}

export class ConversationLoadField implements Action {
  readonly type = ConversationTypes.conversationLoadFailed;
}

export type ConversationActions =
  | LoadConversation
  | ConversationLoaded
  | ConversationLoadField;
