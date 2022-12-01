import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import AuthMiddleware from "@entities/auth/infrastructure/auth.middleware";
import { Types } from "mongoose";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import MessageController from "../application/message.controller";
import { IMessageExtra } from "../domain/interfaces";
import Message from "../domain/message.entity";
import { MessagePaginationArgs } from "./message.args";
import { MessageInputCreate } from "./message.inputs";
import { MessagePaginateResponse } from "./message.response";

const NAMES = namerUtils.get("message");

@Resolver(Message)
class MessageResolver {
  private controller: MessageController;

  constructor() {
    this.controller = new MessageController();
  }

  @Query(() => MessagePaginateResponse, {
    description: "Returns an array of message by chat.",
    name: NAMES.paginate,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(@Args() paginate: MessagePaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => Message, {
    description: "Create a new message.",
    name: NAMES.create,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(MessageInputCreate, "data")
  async create(
    @Arg("data") message: MessageInputCreate,
    @Ctx() ctx: IContext,
    @PubSub(ISubscriptionsTypes.MESSAGES) publish: Publisher<IMessageExtra>,
  ) {
    const { id } = ctx.payload;
    const remitent = new Types.ObjectId(id);
    const result = await this.controller.create({ remitent, ...message });
    await publish({ destinatary: message.destinatary, ...result });
    return result;
  }

  @Subscription({
    description: "Subscription for a new message.",
    name: NAMES.new,
    topics: ISubscriptionsTypes.MESSAGES,
    filter: ({
      payload,
      args,
      context,
    }: {
      payload: IMessageExtra;
      context: IContext;
      args: { chat: string };
    }) => {
      const isFromMyChat = `${payload.chat}` === args.chat;
      const isForMe = `${payload.destinatary}` === context.payload.id;
      return isFromMyChat && isForMe;
    },
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  newMessage(@Root() message: Message, @Arg("chat") _chat: string): Message {
    return message;
  }
}

export default MessageResolver;
