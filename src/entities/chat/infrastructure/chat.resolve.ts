import namerUtils from "@core/infrastructure/utils/namer.utils";
import { Args, Query, Resolver } from "type-graphql";
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
  async paginate(@Args() paginate: ChatPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }
}

export default ChatResolver;
