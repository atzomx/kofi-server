import Chat from "@entities/chat/domain/chat.entity";
import { Message } from "@entities/messages";
import { User } from "@entities/users";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
class ChatOutput extends Chat {
  @Field(() => Message, { nullable: true })
  public lastMessage?: Message;

  @Field(() => User, { nullable: true })
  public destinatary?: User;
}

export default ChatOutput;
