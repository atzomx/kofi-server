import {
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { IContext } from "@core/domain/interfaces";
import { ChatPaginationArgs } from "./chat.args";
import { ChatDocs } from "./chat.docs";
import { ChatOutput } from "./chat.outputs";
import { ChatPaginateResponse } from "./chat.response";
import ChatController from "../application/chat.controller";
import Chat from "../domain/chat.entity";

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

  @FieldResolver()
  lastMessage(@Root() chat: Chat) {
    return this.controller.lastMessage({ chat: chat._id.toString() });
  }

  @FieldResolver()
  destinatary(@Root() chat: Chat, @Ctx() context: IContext) {
    return this.controller.findDestinatary({
      participants: chat.participants,
      user: context.payload.id,
    });
  }

  @FieldResolver()
  unreadedMessages(@Root() chat: Chat, @Ctx() context: IContext) {
    return this.controller.countUnread({
      chat: chat._id.toString(),
      user: context.payload.id,
    });
  }
}

export default ChatResolver;
