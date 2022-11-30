import { Types } from "mongoose";
import "reflect-metadata";
import ChatFaker from "./chat.faker";

describe("User faker", () => {
  it("Should return a chat random", () => {
    const participants = [
      new Types.ObjectId().toString(),
      new Types.ObjectId().toString(),
    ];
    const chat = ChatFaker.get(participants);
    expect(chat).toHaveProperty("participants");
  });
});
