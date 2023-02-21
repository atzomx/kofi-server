/* eslint-disable no-underscore-dangle */
import { IPagination } from "@core/domain/interfaces";
import { UserController } from "@entities/users";
import Interaction from "../domain/interaction.entity";
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
    userFrom: string,
  ): Promise<Interaction & { generatedMatch: boolean; name: string }> {
    const { name } = await this.userController.findById(userFrom);
    await this.userController.findById(interaction.userTo.toString());
    const result = await this.repository.findOrCreateInteraction(
      interaction,
      userFrom,
      name,
    );
    return result;
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
