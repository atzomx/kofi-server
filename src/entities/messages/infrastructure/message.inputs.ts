import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class MessageInputCreate {
  @Field(() => String, { description: "Message destinatary" })
  public destinatary!: Types.ObjectId;

  @Field(() => String, { description: "Message text" })
  public message!: string;

  @Field(() => String, { nullable: true, description: "Message media" })
  public media?: Types.ObjectId;
}
