import { PaginateArgs } from "@core/infrastructure/responses";
import ChatRepository from "../domain/chat.repository";

class ChatController {
  private repository: ChatRepository;

  constructor() {
    this.repository = new ChatRepository();
  }

  async paginate({ limit, page }: PaginateArgs) {
    const paginator = this.repository.paginate(
      {},
      { limit, page },
      { updatedAt: -1 },
      "participants",
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
}

export default ChatController;
