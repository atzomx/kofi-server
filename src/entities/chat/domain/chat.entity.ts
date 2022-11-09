import Entity from "@core/domain/entity";
import { User } from "@entities/users";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Chat extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => [User], { description: "Chat participants." })
  @prop({
    type: () => [Types.ObjectId],
    ref: User,
    default: [],
  })
  public participants?: Ref<User, string>[];
}

export default Chat;
