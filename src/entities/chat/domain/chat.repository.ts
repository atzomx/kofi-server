import { Types } from "mongoose";
import { Repository } from "@core/domain";
import Chat from "./chat.entity";
import ChatModel from "./chat.model";

class ChatRepository extends Repository<Chat> {
  constructor() {
    super(ChatModel);
  }

  async findOrCreateChat(ids: Types.ObjectId[]): Promise<Chat> {
    const reverseIds = [...ids].reverse();

    const query = {
      $or: [{ participants: ids }, { participants: reverseIds }],
    };
    const date = new Date();
    const chatByIds = await this.instance.findOneAndUpdate<Chat>(query, {
      updateAt: date.toISOString(),
    });
    if (chatByIds) return chatByIds;

    const chatCreated = await this.create({
      participants: ids,
    });
    return chatCreated;
  }
}

export default ChatRepository;
