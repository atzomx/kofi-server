/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth";
import { DocumentResolver } from "./document";
import { MessageResolver } from "./messages";
import { UserResolver } from "./users";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  DocumentResolver,
  MessageResolver,
];

export default { resolvers };
