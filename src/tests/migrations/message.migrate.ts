/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { Chat } from "@entities/chat";
import { MessageRepository } from "@entities/messages";
import MessageFaker from "../fakers/message/message.faker";

const TOTAL_MESSAGES = 20;

const up = async (chats: Chat[]) => {
  const messageRepository = new MessageRepository();
  const newMessages = Array.from({ length: TOTAL_MESSAGES }).map(() => {
    const chat = getOneFromArray(chats);
    return MessageFaker.get(chat);
  });

  const messagesCreated = await messageRepository.insertMany(newMessages);
  const cleanMessages = messagesCreated.map((chats) => chats._doc);
  return cleanMessages;
};

const down = async () => {
  const messageRepository = new MessageRepository();
  await messageRepository.deleteMany();
};

export default { up, down };
