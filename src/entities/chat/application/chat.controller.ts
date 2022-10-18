import { Types } from "mongoose";
import ChatRepository from "../domain/chat.repository";

class ChatController {
  private repository: ChatRepository;

  constructor() {
    this.repository = new ChatRepository();
  }

  async findOrCreateChat(ids: Types.ObjectId[]) {
    const reverseIds = ids.reverse();
    const chatByIds = await this.repository.findOne({
      $or: [{ participants: ids }, { participants: reverseIds }],
    });
    if (chatByIds) return chatByIds;

    const chatCreated = await this.repository.create({ participants: ids });
    return chatCreated;
  }
}

export default ChatController;
