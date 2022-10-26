/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth";
import { ChatResolver } from "./chat";
import { DocumentResolver } from "./document";
import { MessageResolver } from "./messages";
import { UserResolver } from "./users";
import { VerificationResolver } from "./verifications";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  DocumentResolver,
  VerificationResolver,
  MessageResolver,
  ChatResolver,
];

export default { resolvers };
