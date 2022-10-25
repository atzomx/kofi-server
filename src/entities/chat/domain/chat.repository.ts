import { Repository } from "@core/domain";
import Chat from "./chat.entity";
import ChatModel from "./chat.model";

class ChatRepository extends Repository<Chat> {
  constructor() {
    super(ChatModel);
  }

  async findOrCreateChat(ids: string[]): Promise<Chat> {
    const reverseIds = [...ids].reverse();

    const query = {
      $or: [{ participants: ids }, { participants: reverseIds }],
    };
    const chatByIds = await this.instance.findOneAndUpdate<Chat>(query, {
      updateAt: Date.now(),
    });
    if (chatByIds) return chatByIds;

    const chatCreated = await this.instance.create<Chat>({
      participants: ids,
    });
    return chatCreated;
  }

  exist(id: string) {
    return this.instance.exists({ _id: id });
  }
}

export default ChatRepository;
