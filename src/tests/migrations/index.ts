import ChatMigrate from "./chat.migrate";
import InteractionMigrate from "./interaction.migrate";
import MatchMigrate from "./match.migrate";
import MediaMigrate from "./media.migrate";
import MessageMigrate from "./message.migrate";
import NotificationMigrate from "./notification.migrate";
import UserMigrate from "./user.migrate";
import VerificationMigrate from "./verification.migrate";
import mongodb from "../config/db";

const up = async () => {
  await mongodb.start();
  const medias = await MediaMigrate.up();
  const users = await UserMigrate.up(medias);
  const chats = await ChatMigrate.up(users);
  const messages = await MessageMigrate.up(chats);
  const verifications = await VerificationMigrate.up(users);
  const matchs = await MatchMigrate.up(users);
  const interactions = await InteractionMigrate.up(matchs);
  const notifications = await NotificationMigrate.up(users, interactions);

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
