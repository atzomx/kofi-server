import { IsOptional } from "class-validator";
import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";
import {
  IVerificationPoses,
  IVerificationStatus,
} from "../domain/verification.enums";

@InputType()
export class VerificationInputCreate {
  @Field({ description: "Verification pose image." })
  public media!: string;

  @Field(() => String)
  public userId!: Types.ObjectId;

  @Field({ description: "Comment of process." })
  public detail!: string;

  @Field(() => IVerificationPoses, { description: "Verification poses." })
  public pose!: IVerificationPoses;

  public status: IVerificationStatus = IVerificationStatus.pending;

  @Field({ description: "CreatedAt of process." })
  @IsOptional()
  public createdAt: Date = new Date();

  @Field({ description: "UpdatedAt of process." })
  @IsOptional()
  public updatedAt: Date = new Date();
}

@InputType()
export class VerificationInputUpdate {
  @Field({ nullable: true, description: "Image to verification." })
  @IsOptional()
  public media?: string;

  @Field({ nullable: true, description: "Comment of process." })
  @IsOptional()
  public detail?: string;

  @Field(() => IVerificationStatus, {
    nullable: true,
    description: "Verification status.",
  })
  @IsOptional()
  public status?: IVerificationStatus;

  @Field(() => IVerificationPoses, {
    nullable: true,
    description: "Verification poses.",
  })
  @IsOptional()
  public pose?: IVerificationPoses;
}
