/* eslint-disable no-underscore-dangle */
import { IPagination } from "@core/domain/interfaces";
import { MatchRepository } from "@entities/match";
import { UserController } from "@entities/users";
import { Types } from "mongoose";
import Interaction from "../domain/interaction.entity";
import { IInteractionTypes } from "../domain/interaction.enums";
import { InteractionNotFoundError } from "../domain/interaction.erros";
import InteractionRepository from "../domain/interaction.repository";
import { InteractionPaginationArgs } from "../infrastructure/interaction.args";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "../infrastructure/interaction.inputs";

class InteractionController {
  private readonly repository: InteractionRepository;
  private readonly userController: UserController;
  private readonly matchRepository: MatchRepository;

  constructor() {
    this.repository = new InteractionRepository();
    this.matchRepository = new MatchRepository();
    this.userController = new UserController();
  }

  async findById(id: string) {
    const currentInteraction = await this.repository.findById(id);
    if (!currentInteraction) throw new InteractionNotFoundError();
    return currentInteraction;
  }

  paginate({
    userFrom,
    page,
    limit,
    type,
  }: InteractionPaginationArgs & { userFrom: string }): Promise<
    IPagination<Interaction>
  > {
    return this.repository.paginate({ userFrom, type }, { limit, page });
  }

  async create(
    interaction: InteractionInputCreate,
    userFrom: string,
  ): Promise<Interaction & { generatedMatch: boolean; name: string }> {
    const { name } = await this.userController.findById(userFrom);
    await this.userController.findById(interaction.userTo.toString());

    const queryReverse = {
      $and: [
        { userFrom: interaction.userTo },
        { userTo: userFrom },
        { type: { $ne: IInteractionTypes.rejected } },
      ],
    };

    let generatedMatch = false;

    const reverseInteraccion = await this.repository.findOne(queryReverse);
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
    const existingInteraccion = await this.repository.findOne(query).lean();
    if (existingInteraccion) {
      return { ...existingInteraccion, generatedMatch, name };
    }

    const result = await this.repository.create({
      userFrom: new Types.ObjectId(userFrom),
      ...interaction,
    });
    return { ...result._doc, generatedMatch, name };
  }

  async update(
    id: string,
    interaction: InteractionInputUpdate,
  ): Promise<Interaction> {
    const updatedInteraction = await this.repository.findByIdAndUpdate(
      id,
      interaction,
    );
    if (!updatedInteraction) throw new InteractionNotFoundError();
    return updatedInteraction;
  }
}

export default InteractionController;
