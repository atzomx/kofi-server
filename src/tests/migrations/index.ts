import mongodb from "../config/db";
import ChatMigrate from "./chat.migrate";
import InteractionMigrate from "./interaction.migrate";
import MatchMigrate from "./match.migrate";
import MediaMigrate from "./media.migrate";
import MessageMigrate from "./message.migrate";
import NotificationMigrate from "./notification.migrate";
import UserMigrate from "./user.migrate";
import VerificationMigrate from "./verification.migrate";

const up = async () => {
  await mongodb.start();
  const users = await UserMigrate.up();
  const chats = await ChatMigrate.up(users);
  const messages = await MessageMigrate.up(chats);
  const verifications = await VerificationMigrate.up(users);
  const matchs = await MatchMigrate.up(users);
  const interactions = await InteractionMigrate.up(matchs);
  const medias = await MediaMigrate.up();
  const notifications = await NotificationMigrate.up(users);

  return {
    users,
    chats,
    messages,
    medias,
    verifications,
    interactions,
    matchs,
    notifications,
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
  await NotificationMigrate.down();
  await mongodb.finish();
};

export default { up, down };
