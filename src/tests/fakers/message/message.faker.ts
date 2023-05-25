import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Chat } from "@entities/chat";
import { Message } from "@entities/messages";
import { IMessageType } from "@entities/messages/domain/message.enums";

class MessageFaker {
  static get(chat: Chat): Message {
    const ownerId = chat.participants[0].toString();
    const owner = new Types.ObjectId(ownerId);
    return {
      chat: chat._id,
      message: faker.lorem.paragraph(),
      owner: owner,
      status: getEnumRandom(IMessageType),
    };
  }
}

export default MessageFaker;
