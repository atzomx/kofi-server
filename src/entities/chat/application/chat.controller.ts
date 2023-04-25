import { IPagination } from "@core/domain/interfaces";
import { PaginateArgs } from "@core/infrastructure/responses";
import Chat from "../domain/chat.entity";
import ChatRepository from "../domain/chat.repository";

class ChatController {
  private repository: ChatRepository;

  constructor() {
    this.repository = new ChatRepository();
  }

  paginate({
    user,
    limit,
    page,
  }: PaginateArgs & { user: string }): Promise<IPagination<Chat>> {
    return this.repository.paginate(
      { participants: user },
      {
        limit,
        page,
        sort: { updatedAt: -1 },
        populate: { path: "participants" },
      },
    );
  }
}

export default ChatController;
