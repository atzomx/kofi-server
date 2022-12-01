/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth";
import { ChatResolver } from "./chat";
import { InteractionResolver } from "./interactions";
import { MessageResolver } from "./messages";
import { NotificationResolver } from "./notifications";
import { UserResolver } from "./users";
import { VerificationResolver } from "./verifications";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  VerificationResolver,
  MessageResolver,
  ChatResolver,
  NotificationResolver,
  InteractionResolver,
];

export default { resolvers };
