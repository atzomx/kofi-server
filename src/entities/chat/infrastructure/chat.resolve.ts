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
import { MessageRepository } from "@entities/messages";
import { UserRepository } from "@entities/users";
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
  async lastMessage(@Root() chat: Chat) {
    const messageRepository = new MessageRepository();
    const message = await messageRepository
      .findOne({ chat: chat._id })
      .sort({ createdAt: -1 })
      .lean();
    return message;
  }

  @FieldResolver()
  async destinatary(@Root() chat: Chat, @Ctx() context: IContext) {
    const userRepository = new UserRepository();
    const current = context.payload.id;

    const destinatary = chat.participants.find((participant) =>
      participant.equals(current),
    );
    const user = await userRepository
      .findById(destinatary)
      .populate({ path: "information.medias" })
      .lean();
    return user;
  }
}

export default ChatResolver;
