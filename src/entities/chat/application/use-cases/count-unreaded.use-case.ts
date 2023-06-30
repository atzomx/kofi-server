import { IMessageType } from "@entities/messages/domain/message.enums";
import MessageRepository from "@entities/messages/domain/message.repository";

class CountUnreadedUseCase {
  private chat: string;
  private user: string;

  constructor({ chat, user }: { chat: string; user: string }) {
    this.chat = chat;
    this.user = user;
  }

  async execute() {
    const messageRepository = new MessageRepository();
    const unreaded = await messageRepository
      .find({
        $and: [
          { chat: this.chat },
          { status: { $ne: IMessageType.read } },
          { owner: { $ne: this.user } },
        ],
      })
      .count();
    return unreaded;
  }
}

export default CountUnreadedUseCase;
