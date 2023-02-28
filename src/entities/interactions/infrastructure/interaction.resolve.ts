import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Notification } from "@entities/notifications";
import NotificationFactory from "@entities/notifications/application/notifications.factory";
import { INotificationType } from "@entities/notifications/domain/notification.enum";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
} from "type-graphql";
import InteractionController from "../application/interaction.controller";
import Interaction from "../domain/interaction.entity";
import { IInteractionTypes } from "../domain/interaction.enums";
import { InteractionPaginationArgs } from "./interaction.args";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "./interaction.inputs";
import {
  InteractionCreateResponse,
  InteractionPaginateResponse,
} from "./interaction.response";

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
  @Authorized()
  async findById(@Arg("id") id: string): Promise<Interaction> {
    const interaction = await this.controller.findById(id);
    return interaction;
  }

  @Query(() => InteractionPaginateResponse, {
    description: "Returns an array of Interaction by user and type.",
    name: NAMES.paginate,
  })
  @Authorized()
  async paginate(
    @Args() paginate: InteractionPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const userFrom = ctx.payload.id;
    const results = await this.controller.paginate({ userFrom, ...paginate });
    return results;
  }

  @Mutation(() => InteractionCreateResponse, {
    description: "Register a new Interaction.",
    name: NAMES.create,
  })
  @Authorized()
  @ValidateArgs(InteractionInputCreate, "data")
  async create(
    @Arg("data") interaction: InteractionInputCreate,
    @Ctx() ctx: IContext,
    @PubSub(ISubscriptionsTypes.NOTIFICATIONS) publish: Publisher<Notification>,
  ) {
    const userFrom = ctx.payload.id;

    const { generatedMatch, name, ...result } = await this.controller.create(
      interaction,
      userFrom,
    );

    if (generatedMatch) {
      const notificationMatch = await NotificationFactory.create(
        INotificationType.match,
        { from: name, owner: interaction.userTo },
      );
      await publish(notificationMatch);
    }

    if (!generatedMatch && result.type !== IInteractionTypes.rejected) {
      const notificationLike = await NotificationFactory.create(
        INotificationType.like,
        { from: name, owner: interaction.userTo },
      );
      await publish(notificationLike);
    }

    return result;
  }

  @Mutation(() => Interaction, {
    description: "Update an existing Interaction by id.",
    name: NAMES.update,
  })
  @Authorized()
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
