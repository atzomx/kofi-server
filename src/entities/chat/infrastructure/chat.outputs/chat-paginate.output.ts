import Entity from "@core/domain/entity";
import { Message } from "@entities/messages";
import { User } from "@entities/users";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
@ObjectType()
class ChatOutput extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => [Types.ObjectId], { description: "Chat participants." })
  public participants?: Types.ObjectId[];

  @Field(() => Message, { nullable: true })
  public lastMessage?: Message;

  @Field(() => User, { nullable: true })
  public destinatary?: User;
}

export default ChatOutput;
