import Entity from "@core/domain/entity";
import { User } from "@entities/users";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IMatchStatus } from "./match.enums";

@ObjectType()
class Match extends Entity {
  @Field(() => ID, { description: "Match identifier." })
  readonly _id?: Types.ObjectId;

  @Field(() => [User], { description: "Match participants." })
  @prop({
    type: () => [Types.ObjectId],
    ref: "User",
    default: [],
  })
  public participants?: Ref<User, string>[];

  @Field(() => IMatchStatus, { description: "Match status." })
  @prop({ required: true, enum: IMatchStatus })
  public status!: IMatchStatus;
}

export default Match;
