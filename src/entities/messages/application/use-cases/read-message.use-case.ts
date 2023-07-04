import { Types } from "mongoose";
import { IMessageType } from "@entities/messages/domain/message.enums";
import MessageRepository from "@entities/messages/domain/message.repository";

class ReadMessageUseCase {
  private message: Types.ObjectId;
  constructor({ message }: { message: Types.ObjectId }) {
    this.message = message;
  }

  async execute() {
    const messageRepository = new MessageRepository();
    const result = await messageRepository.findByIdAndUpdate(this.message, {
      status: IMessageType.read,
    });
    return result;
  }
}

export default ReadMessageUseCase;
