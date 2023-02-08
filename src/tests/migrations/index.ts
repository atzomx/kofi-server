import mongodb from "../config/db";
import ChatMigrate from "./chat.migrate";
import InteractionMigrate from "./interaction.migrate";
import MatchMigrate from "./match.migrate";
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
  const interactions = await InteractionMigrate.up(users);
  const matchs = await MatchMigrate.up(users);
  const medias = await MediaMigrate.up();
  return {
    users,
    chats,
    messages,
    medias,
    verifications,
    interactions,
    matchs,
  };
};

const down = async () => {
  await UserMigrate.down();
  await ChatMigrate.down();
  await MessageMigrate.down();
  await VerificationMigrate.down();
  await MediaMigrate.down();
  await InteractionMigrate.down();
  await MatchMigrate.down();
  await mongodb.finish();
};

export default { up, down };
