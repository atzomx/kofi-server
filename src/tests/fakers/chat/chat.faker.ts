import { Types } from "mongoose";
import { Chat } from "@entities/chat";

class ChatFaker {
  static get(users: Types.ObjectId[]): Chat {
    return {
      participants: users,
    };
  }
}

export default ChatFaker;
