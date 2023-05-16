import Entity from "@core/domain/entity";
import { User } from "@entities/users";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Chat extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => [Types.ObjectId], { description: "Chat participants." })
  @prop({
    type: () => [Types.ObjectId],
    ref: User,
    default: [],
  })
  public participants?: Types.ObjectId[];
}

export default Chat;
