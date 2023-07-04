import { Field, ObjectType } from "type-graphql";
import Chat from "@entities/chat/domain/chat.entity";
import { Message } from "@entities/messages";
import { User } from "@entities/users";
@ObjectType()
class ChatOutput extends Chat {
  @Field(() => Message, { nullable: true })
  public lastMessage?: Message;

  @Field(() => User, { nullable: true })
  public destinatary?: User;

  @Field(() => Number, { nullable: true, defaultValue: 0 })
  public unreadedMessages?: User;
}

export default ChatOutput;
