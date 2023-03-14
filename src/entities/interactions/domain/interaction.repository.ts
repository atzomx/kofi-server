import { Repository } from "@core/domain";
import { MatchRepository } from "@entities/match";
import { User } from "@entities/users";
import { Types } from "mongoose";
import { InteractionInputCreate } from "../infrastructure/interaction.inputs";
import Interaction from "./interaction.entity";
import { IInteractionTypes } from "./interaction.enums";
import InteractionModel from "./interaction.model";

class InteractionRepository extends Repository<Interaction> {
  constructor() {
    super(InteractionModel);
  }

  // TODO review if we need move this into a usercase
  async findOrCreateInteraction(
    interaction: InteractionInputCreate,
    userFrom: string,
    name: string,
  ): Promise<Interaction & { generatedMatch: boolean; name: string }> {
    const matchRepository = new MatchRepository();
    const queryReverse = {
      $and: [
        { userFrom: interaction.userTo },
        { userTo: userFrom },
        { type: { $ne: IInteractionTypes.rejected } },
      ],
    };

    let generatedMatch = false;

    const reverseInteraccion = await this.instance.findOne(queryReverse);
    if (reverseInteraccion) {
      generatedMatch = !!(await matchRepository.findOrCreateMatch([
        userFrom,
        interaction.userTo.toString(),
      ]));
    }

    const query = {
      $and: [
        { userFrom: userFrom },
        { userTo: interaction.userTo },
        { type: interaction.type },
      ],
    };
    const date = new Date();
    const existingInteraccion = await this.instance
      .findOneAndUpdate(query, {
        updateAt: date.toISOString(),
      })
      .lean();
    if (existingInteraccion) {
      return { ...existingInteraccion, generatedMatch, name };
    }

    const result = await this.instance.create({
      userFrom: new Types.ObjectId(userFrom),
      ...interaction,
    });
    return { ...result._doc, generatedMatch, name };
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
