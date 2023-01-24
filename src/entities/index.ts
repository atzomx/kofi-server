/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth";
import { ChatResolver } from "./chat";
import { InteractionResolver } from "./interactions";
import { MatchResolver } from "./match";
import { MediaResolver } from "./media";
import { MessageResolver } from "./messages";
import { NotificationResolver } from "./notifications";
import { UserResolver } from "./users";
import { VerificationResolver } from "./verifications";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  MediaResolver,
  AuthResolver,
  VerificationResolver,
  MessageResolver,
  ChatResolver,
  NotificationResolver,
  InteractionResolver,
  MatchResolver,
];

export default { resolvers };
