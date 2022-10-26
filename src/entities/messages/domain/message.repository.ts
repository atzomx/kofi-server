import { Repository } from "@core/domain";
import Message from "./message.entity";
import MessageModel from "./message.model";

class MessageRepository extends Repository<Message> {
  constructor() {
    super(MessageModel);
  }
}

export default MessageRepository;
