import { ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import Verification from "../domain/verification.entity";

@ObjectType()
export class VerificationPaginateResponse extends PaginateResponse(
  Verification,
) {}
