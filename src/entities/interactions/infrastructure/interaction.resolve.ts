import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import AuthMiddleware from "@entities/auth/infrastructure/auth.middleware";
import { Notification } from "@entities/notifications";
import NotificationFactory from "@entities/notifications/application/notifications.factory";
import { INotificationType } from "@entities/notifications/domain/notification.enum";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  PubSub,
  Publisher,
  Query,
  Resolver,
  UseMiddleware,
  Subscription,
  Root,
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

  @Mutation(() => InteractionCreateResponse, {
    description: "Register a new Interaction.",
    name: NAMES.create,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(InteractionInputCreate, "data")
  async create(
    @Arg("data") interaction: InteractionInputCreate,
    @Ctx() ctx: IContext,
    @PubSub(ISubscriptionsTypes.INTERACTIONS) publish: Publisher<Notification>,
  ) {
    const userFrom = ctx.payload.id;

    const result = await this.controller.create(interaction, userFrom);

    const { generatedMatch, type, name } = result;

    if (IInteractionTypes.rejected !== type && !generatedMatch) {
      const notificationLike = NotificationFactory.create(
        INotificationType.like,
      );
      notificationLike.owner = interaction.userTo;
      notificationLike.from = name;

      await publish(notificationLike);
    }
    if (generatedMatch) {
      const notificationMatch = NotificationFactory.create(
        INotificationType.match,
      );
      notificationMatch.owner = interaction.userTo;
      notificationMatch.from = name;
      await publish(notificationMatch);
    }

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

  @Subscription({
    description: "Subscription for interaction notifications.",
    name: NAMES.new,
    topics: ISubscriptionsTypes.INTERACTIONS,
    filter: ({
      payload,
      context,
    }: {
      payload: Notification;
      context: IContext;
    }) => payload.owner.toString() === context.payload.id,
  })
  newNotification(@Root() notification: Notification): Notification {
    return notification;
  }
}

export default InteractionResolver;
