import { InteractionRepository } from "@entities/interactions";
import Interaction from "@entities/interactions/domain/interaction.entity";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { InteractionInputCreate } from "@entities/interactions/infrastructure/interaction.inputs";
import { MatchRepository } from "@entities/match";
import { User } from "@entities/users";

type TCreateInteractionUseCase = {
  interaction: InteractionInputCreate;
  repository: InteractionRepository;
  user: User;
};
class CreateInteractionUseCase {
  private interaction: InteractionInputCreate;
  private repository: InteractionRepository;
  private user: User;

  constructor({ interaction, repository, user }: TCreateInteractionUseCase) {
    this.interaction = interaction;
    this.repository = repository;
    this.user = user;
  }

  async existsReverseInteraction() {
    const queryReverse = {
      $and: [
        { userFrom: this.interaction.userTo },
        { userTo: this.user._id },
        { type: { $ne: IInteractionTypes.rejected } },
      ],
    };

    const interaccion = await this.repository.exists(queryReverse);
    if (!interaccion) return false;

    const matchRepository = new MatchRepository();
    await matchRepository.findOrCreateMatch([
      this.user._id.toString(),
      this.interaction.userTo.toString(),
    ]);
    return true;
  }

  async getInteraction() {
    const query = {
      $and: [
        { userFrom: this.user._id },
        { userTo: this.interaction.userTo },
        { type: this.interaction.type },
      ],
    };
    const existedInteraction = await this.repository.instance
      .findOneAndUpdate(query, { updateAt: new Date().toISOString() })
      .lean<Interaction>();

    if (existedInteraction) return existedInteraction;

    const interaction = await this.repository.create({
      userFrom: this.user._id,
      ...this.interaction,
    });
    return interaction;
  }

  async execute() {
    const generatedMatch = await this.existsReverseInteraction();
    const interaction = await this.getInteraction();
    return { interaction, generatedMatch };
  }
}

export default CreateInteractionUseCase;
