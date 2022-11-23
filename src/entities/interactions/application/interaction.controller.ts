import { IPagination } from "@core/domain/interfaces";
import { UserController } from "@entities/users";
import { Types } from "mongoose";
import Interaction from "../domain/interaction.entity";
import { InteractionNotFoundError } from "../domain/interaction.erros";
import InteractionRepository from "../domain/interaction.repository";
import { InteractionPaginationArgs } from "../infrastructure/interaction.args";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "../infrastructure/interaction.inputs";
//import InteractionUtils from "./interaction.utils";

class InteractionController {
  private repository: InteractionRepository;
  private userController: UserController;

  constructor() {
    this.repository = new InteractionRepository();
    this.userController = new UserController();
  }

  async findById(id: string) {
    const currentInteraction = await this.repository.findById(id);
    if (!currentInteraction) throw new InteractionNotFoundError();
    return currentInteraction;
  }

  async paginate({
    userFrom,
    page,
    limit,
    type,
  }: InteractionPaginationArgs & { userFrom: string }): Promise<
    IPagination<Interaction>
  > {
    const paginator = this.repository.paginate(
      { userFrom, type },
      { limit, page },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async create(
    interaction: InteractionInputCreate,
    userFrom: string,
  ): Promise<Interaction> {
    await this.userController.findById(userFrom);
    await this.userController.findById(interaction.userTo.toString());

    const query = {
      $and: [
        { userFrom: userFrom },
        { userTo: interaction.userTo },
        { type: interaction.type },
      ],
    };
    const existingVerification = await this.repository.findOne(query);
    if (existingVerification) return existingVerification;

    const result = await this.repository.create({
      userFrom: new Types.ObjectId(userFrom),
      ...interaction,
    });
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
