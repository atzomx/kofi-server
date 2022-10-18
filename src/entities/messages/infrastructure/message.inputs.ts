import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";
import { IMessageType } from "../domain/message.enums";

@InputType()
export class MessageInputCreate {
  @Field(() => String, { description: "Message chat identifier" })
  public chat?: Types.ObjectId;

  @Field(() => String, { description: "Message remitent" })
  public remitent!: Types.ObjectId;

  @Field(() => String, { description: "Message destinatary" })
  public destinatary!: Types.ObjectId;

  @Field(() => String, { description: "Message text" })
  public message?: string;

  @Field(() => String, { description: "Message media" })
  public media?: string;

  @Field(() => IMessageType, { description: "Message status" })
  public status!: IMessageType;
}
