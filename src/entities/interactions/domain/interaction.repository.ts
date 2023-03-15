import { Repository } from "@core/domain";
import { User } from "@entities/users";
import { Types } from "mongoose";
import Interaction from "./interaction.entity";
import InteractionModel from "./interaction.model";

class InteractionRepository extends Repository<Interaction> {
  constructor() {
    super(InteractionModel);
  }

  async unavailableUsers(user: User): Promise<Types.ObjectId[]> {
    const searchQuery2 = { userFrom: user._id.toString() };
    const interactionOfThisUser = await this.instance
      .find(searchQuery2)
      .select("userTo");

    const noInUsers = [...interactionOfThisUser]
      .map(({ userTo }) => userTo)
      .concat([user._id]);

    return noInUsers;
  }
}

export default InteractionRepository;
