import { Chat } from "@entities/chat";
import { Types } from "mongoose";

class ChatFaker {
  static get(users: Types.ObjectId[]): Chat {
    return {
      participants: users,
    };
  }
}

export default ChatFaker;
