import { IContext } from "@core/domain/interfaces";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import { AuthMiddleware } from "@entities/auth";
import { Args, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import ChatController from "../application/chat.controller";
import Chat from "../domain/chat.entity";
import { ChatPaginationArgs } from "./chat.args";
import { ChatPaginateResponse } from "./chat.response";

const NAMES = namerUtils.get("chat");

@Resolver(Chat)
class ChatResolver {
  private controller: ChatController;

  constructor() {
    this.controller = new ChatController();
  }

  @Query(() => ChatPaginateResponse, {
    description: "Returns an array of chats.",
    name: NAMES.paginate,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(@Args() paginate: ChatPaginationArgs, @Ctx() ctx: IContext) {
    const { id } = ctx.payload;
    const results = await this.controller.paginate({ user: id, ...paginate });
    return results;
  }
}

export default ChatResolver;
