import { Chat } from "@entities/chat";

class ChatFaker {
  static get(users: string[]): Chat {
    return {
      participants: users,
    };
  }
}

export default ChatFaker;
