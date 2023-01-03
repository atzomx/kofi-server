import mongodb from "../config/db";
import ChatMigrate from "./chat.migrate";
import MediaMigrate from "./media.migrate";
import MessageMigrate from "./message.migrate";
import UserMigrate from "./user.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  const chats = await ChatMigrate.up(users);
  const messages = await MessageMigrate.up(chats);
  const medias = await MediaMigrate.up();
  return { users, chats, messages, medias };
};

const down = async () => {
  await UserMigrate.down();
  await ChatMigrate.down();
  await MessageMigrate.down();
  await MediaMigrate.down();
  await mongodb.finish();
};

export default { up, down };
