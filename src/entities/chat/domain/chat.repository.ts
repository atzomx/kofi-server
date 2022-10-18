import { Repository } from "@core/domain";
import Chat from "./chat.entity";
import ChatModel from "./chat.model";

class ChatRepository extends Repository<Chat> {
  constructor() {
    super(ChatModel);
  }
}

export default ChatRepository;
