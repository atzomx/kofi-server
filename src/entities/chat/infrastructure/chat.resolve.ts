import { IContext } from "@core/domain/interfaces";
import { Message, MessageRepository } from "@entities/messages";
import { User, UserRepository } from "@entities/users";
import {
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import ChatController from "../application/chat.controller";
import Chat from "../domain/chat.entity";
import { ChatPaginationArgs } from "./chat.args";
import { ChatDocs } from "./chat.docs";
import { ChatOutput } from "./chat.outputs";
import { ChatPaginateResponse } from "./chat.response";

@Resolver(ChatOutput)
class ChatResolver {
  private controller: ChatController;

  constructor() {
    this.controller = new ChatController();
  }

  @Query(() => ChatPaginateResponse, ChatDocs.ChatPaginateResponseDocs)
  @Authorized()
  async paginate(@Args() paginate: ChatPaginationArgs, @Ctx() ctx: IContext) {
    const { id } = ctx.payload;
    const results = await this.controller.paginate({ user: id, ...paginate });
    return results;
  }

  @FieldResolver(() => Message)
  async lastMessage(@Root() chat: Chat) {
    const messageRepository = new MessageRepository();
    const message = await messageRepository
      .findOne({ chat: chat._id })
      .sort({ createdAt: -1 })
      .lean();
    return message;
  }

  @FieldResolver(() => User)
  async destinatary(@Root() chat: Chat, @Ctx() context: IContext) {
    const userRepository = new UserRepository();
    const current = context.payload.id;
    const [first, second] = chat.participants;

    const destinatary = first.equals(current) ? first : second;
    const user = await userRepository.findById(destinatary).lean();
    return user;
  }
}

export default ChatResolver;
