import Entity from "@core/domain/entity";
import { Media } from "@entities/media";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IMessageType } from "./message.enums";

@ObjectType()
class Message extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => String, { description: "Chat identifier" })
  @prop({ required: true })
  public chat!: Types.ObjectId;

  @Field(() => String, { description: "Owner identifier" })
  @prop({ required: true })
  public owner!: Types.ObjectId;

  @Field(() => String, { description: "Message content" })
  @prop({ required: true })
  public message!: string;

  @Field(() => IMessageType, { description: "Status type" })
  @prop({ required: true })
  public status!: IMessageType;

  @Field(() => Media, { description: "Media file message.", nullable: true })
  @prop({
    type: () => Types.ObjectId,
    ref: Media,
    default: null,
  })
  public media?: Types.ObjectId;
}

export default Message;
