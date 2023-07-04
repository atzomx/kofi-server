import { MessageRepository } from "@entities/messages";

class LastMessageUseCase {
  private chat: string;

  constructor({ chat }: { chat: string }) {
    this.chat = chat;
  }

  async execute() {
    const messageRepository = new MessageRepository();
    const message = await messageRepository
      .findOne({ chat: this.chat })
      .sort({ createdAt: -1 })
      .lean();
    return message;
  }
}

export default LastMessageUseCase;
