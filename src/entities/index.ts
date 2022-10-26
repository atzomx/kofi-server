/* eslint-disable @typescript-eslint/ban-types */
import { NonEmptyArray } from "type-graphql";
import { AuthResolver } from "./auth";
import { DocumentResolver } from "./document";
import { UserResolver } from "./users";
import { VerificationResolver } from "./verifications";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  AuthResolver,
  DocumentResolver,
  VerificationResolver,
];

export default { resolvers };
