import { Types } from "mongoose";
import { IPagination } from "@core/domain/interfaces";
import { ChatRepository } from "@entities/chat";
import { MessageRepository } from "@entities/messages";
import { ReadMessageUseCase } from "./use-cases";
import Message from "../domain/message.entity";
import { IMessageType } from "../domain/message.enums";
import { MessagePaginationArgs } from "../infrastructure/message.args";
import { MessageInputCreate } from "../infrastructure/message.inputs";

class MessageController {
  private repository: MessageRepository;

  constructor() {
    this.repository = new MessageRepository();
  }

  paginate({
    chat,
    limit,
    page,
  }: MessagePaginationArgs): Promise<IPagination<Message>> {
    return this.repository.paginate(
      { chat },
      { limit, page, sort: { createdAt: -1 }, populate: { path: "media" } },
    );
  }

  async create(
    inputMessage: MessageInputCreate & { remitent: Types.ObjectId },
  ): Promise<Message> {
    const chatRepository = new ChatRepository();

    const chat = await chatRepository.findOrCreateChat([
      inputMessage.destinatary,
      inputMessage.remitent,
    ]);

    const created = await this.repository.create({
      chat: chat._id,
      message: inputMessage.message,
      media: inputMessage.media,
      owner: inputMessage.remitent,
      status: IMessageType.sent,
    });
    return created;
  }

  async readMessage({ message }: { message: Types.ObjectId }) {
    const readMessageUseCase = new ReadMessageUseCase({ message });
    const readedMessage = readMessageUseCase.execute();
    return readedMessage;
  }
}

export default MessageController;
