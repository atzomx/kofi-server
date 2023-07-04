import { Types } from "mongoose";
import { UserRepository } from "@entities/users";

class FindDestinataryUseCase {
  private user: string;
  private participants: Types.ObjectId[];

  constructor({
    participants,
    user,
  }: {
    participants: Types.ObjectId[];
    user: string;
  }) {
    this.participants = participants;
    this.user = user;
  }

  async execute() {
    const userRepository = new UserRepository();
    const destinatary = this.participants.find((participant) =>
      participant.equals(this.user),
    );
    const user = await userRepository
      .findById(destinatary)
      .populate({ path: "information.medias" })
      .lean();
    return user;
  }
}

export default FindDestinataryUseCase;
