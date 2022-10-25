import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IMessageType } from "./message.enums";

@ObjectType()
class Message extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  public chat!: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  public owner!: Types.ObjectId;

  @Field({ description: "Message content" })
  @prop({ required: true })
  public message!: string;

  @Field({ description: "Status type" })
  @prop({ required: true })
  public status!: IMessageType;

  @Field({ nullable: true, description: "Media file message" })
  @prop({ required: false })
  public media?: string;
}

export default Message;
