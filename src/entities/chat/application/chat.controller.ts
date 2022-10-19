import ChatRepository from "../domain/chat.repository";

class ChatController {
  private repository: ChatRepository;

  constructor() {
    this.repository = new ChatRepository();
  }

  async findOrCreateChat(ids: string[]) {
    const reverseIds = [...ids].reverse();

    const query = {
      $or: [{ participants: ids }, { participants: reverseIds }],
    };
    const chatByIds = await this.repository.findOne(query);
    if (chatByIds) return chatByIds;

    const chatCreated = await this.repository.create({ participants: ids });
    return chatCreated;
  }

  exist(id: string) {
    return this.repository.custom().exists({ _id: id });
  }
}

export default ChatController;
