import { Types } from "mongoose";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import messageUtils from "@core/infrastructure/utils/message.utils";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import NotificationFactory from "@entities/notifications/application/notifications.factory";
import { INotificationType } from "@entities/notifications/domain/notification.enum";
import { MessagePaginationArgs } from "./message.args";
import { MessageDocs } from "./message.docs";
import { MessageInputCreate } from "./message.inputs";
import { MessagePaginateResponse } from "./message.response";
import MessageController from "../application/message.controller";
import { IMessageExtra } from "../domain/interfaces";
import Message from "../domain/message.entity";

const NAMES = namerUtils.get("message");

@Resolver(Message)
class MessageResolver {
  private controller: MessageController;

  constructor() {
    this.controller = new MessageController();
  }

  @Query(() => MessagePaginateResponse, MessageDocs.MessagePaginateResponseDocs)
  @Authorized()
  async paginate(@Args() paginate: MessagePaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => Message, MessageDocs.MessageCreateMutationDocs)
  @Authorized()
  @ValidateArgs(MessageInputCreate, "data")
  async create(
    @Arg("data") message: MessageInputCreate,
    @Ctx() ctx: IContext,
    @PubSub() pubsub: PubSubEngine,
  ) {
    const { id } = ctx.payload;
    const remitent = new Types.ObjectId(id);
    const result = await this.controller.create({ remitent, ...message });

    await pubsub.publish(ISubscriptionsTypes.MESSAGES, {
      destinatary: message.destinatary,
      ...result,
    });

    const notification = await NotificationFactory.create(
      INotificationType.message,
      {
        owner: message.destinatary,
        from: remitent,
        idReference: result.chat.toString(),
        message: messageUtils.getMessage(message.message),
      },
    );
    await pubsub.publish(ISubscriptionsTypes.NOTIFICATIONS, notification);
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
      const isFromMyChat = payload.chat.toString() === args.chat;
      const isForMe = payload.destinatary.toString() === context.payload.id;
      return isFromMyChat && isForMe;
    },
  })
  newMessage(@Root() message: Message, @Arg("chat") _chat: string): Message {
    this.controller.readMessage({ message: message._id });
    return {
      ...message,
      createdAt: new Date(message.createdAt),
      updatedAt: new Date(message.updatedAt),
    };
  }
}

export default MessageResolver;
