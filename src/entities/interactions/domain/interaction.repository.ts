import { Repository } from "@core/domain";
import { MatchRepository } from "@entities/match";
import { Types } from "mongoose";
import { InteractionInputCreate } from "../infrastructure/interaction.inputs";
import Interaction from "./interaction.entity";
import { IInteractionTypes } from "./interaction.enums";
import InteractionModel from "./interaction.model";

class InteractionRepository extends Repository<Interaction> {
  private readonly matchRepository: MatchRepository;
  constructor() {
    super(InteractionModel);
    this.matchRepository = new MatchRepository();
  }

  async findOrCreateInteraction(
    interaction: InteractionInputCreate,
    userFrom: string,
    name: string,
  ): Promise<Interaction & { generatedMatch: boolean; name: string }> {
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
      generatedMatch = !!(await this.matchRepository.findOrCreateMatch([
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
}

export default InteractionRepository;
