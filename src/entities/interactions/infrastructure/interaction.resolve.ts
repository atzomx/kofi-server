import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import AuthMiddleware from "@entities/auth/infrastructure/auth.middleware";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import InteractionController from "../application/interaction.controller";
import Interaction from "../domain/interaction.entity";
import { InteractionPaginationArgs } from "./interaction.args";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "./interaction.inputs";
import { InteractionPaginateResponse } from "./interaction.response";

const NAMES = NamerUtils.get("interaction");

@Resolver(Interaction)
class InteractionResolver {
  private controller: InteractionController;

  constructor() {
    this.controller = new InteractionController();
  }

  @Query(() => Interaction, {
    description: "Returns one Interaction by id",
    name: NAMES.find,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async findById(@Arg("id") id: string): Promise<Interaction> {
    const interaction = await this.controller.findById(id);
    return interaction;
  }

  @Query(() => InteractionPaginateResponse, {
    description: "Returns an array of Interaction by user and type.",
    name: NAMES.paginate,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(
    @Args() paginate: InteractionPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const userFrom = ctx.payload.id;
    const results = await this.controller.paginate({ userFrom, ...paginate });
    return results;
  }

  @Mutation(() => Interaction, {
    description: "Register a new Interaction.",
    name: NAMES.create,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(InteractionInputCreate, "data")
  async create(
    @Arg("data") interaction: InteractionInputCreate,
    @Ctx() ctx: IContext,
  ) {
    const userFrom = ctx.payload.id;

    const result = await this.controller.create(interaction, userFrom);
    return result;
  }

  @Mutation(() => Interaction, {
    description: "Update an existing Interaction by id.",
    name: NAMES.update,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(InteractionInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") interaction: InteractionInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), interaction);
    return result;
  }
}

export default InteractionResolver;
