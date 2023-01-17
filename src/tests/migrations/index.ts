import mongodb from "../config/db";
import ChatMigrate from "./chat.migrate";
import MediaMigrate from "./media.migrate";
import MessageMigrate from "./message.migrate";
import UserMigrate from "./user.migrate";
import VerificationMigrate from "./verification.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  const chats = await ChatMigrate.up(users);
  const messages = await MessageMigrate.up(chats);
  const verifications = await VerificationMigrate.up(users);
  const medias = await MediaMigrate.up();
  return { users, chats, messages, medias, verifications };
};

const down = async () => {
  await UserMigrate.down();
  await ChatMigrate.down();
  await MessageMigrate.down();
  await VerificationMigrate.down();
  await MediaMigrate.down();
  await mongodb.finish();
};

export default { up, down };
