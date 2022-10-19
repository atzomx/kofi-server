import { ValidateArgs } from "@core/infrastructure/decorators";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import MessageController from "../application/message.controller";
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
  async paginate(@Args() paginate: MessagePaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => Message, {
    description: "Create a new message.",
    name: NAMES.create,
  })
  @ValidateArgs(MessageInputCreate, "data")
  async create(@Arg("data") message: MessageInputCreate) {
    const result = await this.controller.create(message);
    return result;
  }
}

export default MessageResolver;
