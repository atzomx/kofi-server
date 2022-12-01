import "reflect-metadata";
import { Chat } from "@entities/chat";
import { Types } from "mongoose";
import MessageFaker from "./message.faker";

describe("Chat faker", () => {
  it("Should return a chat random", () => {
    const participants = [
      new Types.ObjectId().toString(),
      new Types.ObjectId().toString(),
    ];
    const chat: Chat = {
      participants,
      _id: new Types.ObjectId(),
    };

    const message = MessageFaker.get(chat);
    expect(message).toHaveProperty("chat");
    expect(message).toHaveProperty("message");
    expect(message).toHaveProperty("owner");
    expect(message).toHaveProperty("status");
  });
});
