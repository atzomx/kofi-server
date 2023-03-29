import { IContext } from "@core/domain/interfaces";
import { Args, Authorized, Ctx, Query, Resolver } from "type-graphql";
import ChatController from "../application/chat.controller";
import Chat from "../domain/chat.entity";
import { ChatPaginationArgs } from "./chat.args";
import { ChatDocs } from "./chat.docs";
import { ChatPaginateResponse } from "./chat.response";

@Resolver(Chat)
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
}

export default ChatResolver;
