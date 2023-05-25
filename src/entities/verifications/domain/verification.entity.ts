import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import Entity from "@core/domain/entity";
import { IVerificationPoses, IVerificationStatus } from "./verification.enums";

@ObjectType()
class Verification extends Entity {
  @Field(() => ID, { description: "Verification identifier." })
  readonly _id?: Types.ObjectId;

  @Field({ description: "Image to verification." })
  @prop({ required: true })
  readonly media!: string;

  @Field(() => String, {
    description: "User profile to verification.",
  })
  @prop({ required: true })
  readonly userId!: Types.ObjectId;

  @Field({ description: "Comment of process." })
  @prop({ required: true })
  public detail!: string;

  @Field(() => IVerificationStatus, { description: "Verification status." })
  @prop({ required: true, enum: IVerificationStatus })
  public status!: IVerificationStatus;

  @Field(() => IVerificationPoses, { description: "Verification poses." })
  @prop({ required: true, enum: IVerificationPoses })
  public pose!: IVerificationPoses;
}

export default Verification;
