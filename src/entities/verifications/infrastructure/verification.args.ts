import { ArgsType, Field } from "type-graphql";
import { PaginateArgs } from "@core/infrastructure/responses";
import {
  IVerificationStatus,
  IVerificationPoses,
} from "../domain/verification.enums";

@ArgsType()
export class VerificationPaginationArgs extends PaginateArgs {
  @Field(() => IVerificationPoses, {
    nullable: true,
    description: "Verification pose.",
  })
  public pose?: IVerificationPoses;

  @Field(() => IVerificationStatus, {
    nullable: true,
    description: "Verification status.",
  })
  public status?: IVerificationStatus;

  @Field(() => Date, {
    nullable: true,
    description: "Verification start creation date.",
  })
  public createdAt?: Date;

  @Field(() => String, {
    nullable: true,
    description: "Verification user creation .",
  })
  public userId?: string;
}
