/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { ChatRepository } from "@entities/chat";
import { User } from "@entities/users";
import ChatFaker from "../fakers/chat/chat.faker";

const TOTAL_CHATS = 20;

const up = async (users: User[]) => {
  const chatRepository = new ChatRepository();
  const newChats = Array.from({ length: TOTAL_CHATS }).map(() => {
    const userOne = getOneFromArray(users)._id;
    const userTwo = getOneFromArray(users)._id;
    const participants = [userOne, userTwo];
    return ChatFaker.get(participants);
  });

  const chatsCreated = await chatRepository.insertMany(newChats);
  const cleanChats = chatsCreated.map((chats) => chats._doc);
  return cleanChats;
};

const down = async () => {
  const chatRepository = new ChatRepository();
  await chatRepository.deleteMany();
};

export default { up, down };
