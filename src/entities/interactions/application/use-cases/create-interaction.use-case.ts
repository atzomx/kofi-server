import { InteractionRepository } from "@entities/interactions";
import Interaction from "@entities/interactions/domain/interaction.entity";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { InteractionInputCreate } from "@entities/interactions/infrastructure/interaction.inputs";
import { MatchRepository } from "@entities/match";
import { Types } from "mongoose";

class CreateInteractionUseCase {
  async execute(
    interaction: InteractionInputCreate,
    userFrom: string,
    name: string,
    repository: InteractionRepository,
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

    const reverseInteraccion = await repository.findOne(queryReverse);
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
    const existingInteraccion = await repository.instance
      .findOneAndUpdate(query, {
        updateAt: date.toISOString(),
      })
      .lean();
    if (existingInteraccion) {
      return { ...existingInteraccion, generatedMatch, name };
    }

    const result = await repository.create({
      userFrom: new Types.ObjectId(userFrom),
      ...interaction,
    });
    return { ...result, generatedMatch, name };
  }
}

export default CreateInteractionUseCase;
