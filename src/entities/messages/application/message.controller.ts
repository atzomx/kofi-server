import { ChatController } from "@entities/chat";
import { MessageRepository } from "@entities/messages";
import Message from "../domain/message.entity";
import { IMessageType } from "../domain/message.enums";
import { MessageInputCreate } from "../infrastructure/message.inputs";

class MessageController {
  private repository: MessageRepository;

  constructor() {
    this.repository = new MessageRepository();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async create(inputMessage: MessageInputCreate): Promise<Message> {
    const controller = new ChatController();

    let chatId = inputMessage.chat;
    if (!chatId) {
      const chat = await controller.findOrCreateChat([
        inputMessage.destinatary,
        inputMessage.remitent,
      ]);
      chatId = chat._id;
    }

    const message = await this.repository.create({
      chat: chatId,
      message: inputMessage.message,
      media: inputMessage.media,
      owner: inputMessage.remitent,
      status: IMessageType.sent,
    });

    return message;
  }
}

export default MessageController;
