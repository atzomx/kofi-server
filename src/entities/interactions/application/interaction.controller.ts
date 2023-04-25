/* eslint-disable no-underscore-dangle */
import { IPagination } from "@core/domain/interfaces";
import { User, UserController } from "@entities/users";
import Interaction from "../domain/interaction.entity";
import { InteractionNotFoundError } from "../domain/interaction.erros";
import InteractionRepository from "../domain/interaction.repository";
import { InteractionPaginationArgs } from "../infrastructure/interaction.args";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "../infrastructure/interaction.inputs";
import CreateInteractionUseCase from "./use-cases/create-interaction.use-case";

class InteractionController {
  private readonly repository: InteractionRepository;
  private readonly userController: UserController;

  constructor() {
    this.repository = new InteractionRepository();
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
    useFrom: User,
  ): Promise<{
    interaction: Interaction;
    generatedMatch: boolean;
    userTo: User;
  }> {
    const userTo = await this.userController.findById(
      interaction.userTo.toString(),
    );
    const createInteractionUseCase = new CreateInteractionUseCase({
      interaction,
      user: useFrom,
      repository: this.repository,
    });
    const result = await createInteractionUseCase.execute();
    return {
      userTo,
      interaction: result.interaction,
      generatedMatch: result.generatedMatch,
    };
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
