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
    const chatByIds = await super.instance.findOne<Chat>(query);
    if (chatByIds) return chatByIds;

    const chatCreated = await super.instance.create<Chat>({
      participants: ids,
    });
    return chatCreated;
  }

  exist(id: string) {
    return super.instance.exists({ _id: id });
  }
}

export default ChatRepository;
