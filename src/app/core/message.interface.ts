export interface Conversation {
  id: number;
  name: string;
  messages: Message[];
}

export interface Message {
  message: string;
}
