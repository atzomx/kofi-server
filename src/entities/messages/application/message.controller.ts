import { ChatController } from "@entities/chat";
import { MessageRepository } from "@entities/messages";
import Message from "../domain/message.entity";
import { IMessageType } from "../domain/message.enums";
import { MessagePaginationArgs } from "../infrastructure/message.args";
import { MessageInputCreate } from "../infrastructure/message.inputs";

class MessageController {
  private repository: MessageRepository;

  constructor() {
    this.repository = new MessageRepository();
  }

  async paginate({ chat, limit, page }: MessagePaginationArgs) {
    const paginator = this.repository.paginate(
      { chat },
      { limit, page },
      { createdAt: -1 },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async create(inputMessage: MessageInputCreate): Promise<Message> {
    const controller = new ChatController();

    const chat = await controller.findOrCreateChat([
      inputMessage.destinatary.toString(),
      inputMessage.remitent.toString(),
    ]);

    const message = await this.repository.create({
      chat: chat._id,
      message: inputMessage.message,
      media: inputMessage.media,
      owner: inputMessage.remitent,
      status: IMessageType.sent,
    });

    return message;
  }
}

export default MessageController;
