import { Types } from "mongoose";
import { IPagination } from "@core/domain/interfaces";
import { PaginateArgs } from "@core/infrastructure/responses";
import {
  CountUnreadedUseCase,
  FindDestinataryUseCase,
  LastMessageUseCase,
} from "./use-cases";
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
      },
    );
  }

  async lastMessage({ chat }: { chat: string }) {
    const lastMessageUseCase = new LastMessageUseCase({ chat });
    const lastMessageData = lastMessageUseCase.execute();
    return lastMessageData;
  }

  async findDestinatary({
    user,
    participants,
  }: {
    user: string;
    participants: Types.ObjectId[];
  }) {
    return new FindDestinataryUseCase({ user, participants }).execute();
  }

  countUnread({ chat, user }: { chat: string; user: string }) {
    return new CountUnreadedUseCase({ chat, user }).execute();
  }
}

export default ChatController;
