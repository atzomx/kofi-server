import mongodb from "../config/db";
import ChatMigrate from "./chat.migrate";
import MessageMigrate from "./message.migrate";
import UserMigrate from "./user.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  const chats = await ChatMigrate.up(users);
  const messages = await MessageMigrate.up(chats);
  return { users, chats, messages };
};

const down = async () => {
  await UserMigrate.down();
  await ChatMigrate.down();
  await MessageMigrate.down();
  await mongodb.finish();
};

export default { up, down };
