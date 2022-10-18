import { Index, prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@Index({ participants: 1 }, { unique: true })
@ObjectType()
class Chat {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  public participants!: Types.ObjectId[];
}

export default Chat;
