import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Verification from "../domain/verification.entity";

@ObjectType()
export class VerificationPaginateResponse extends PaginateResponse(
  Verification,
) {}
