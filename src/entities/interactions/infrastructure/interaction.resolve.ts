import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
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
import { InteractionDocs } from "./interaction.docs";
import {
  InteractionInputCreate,
  InteractionInputUpdate,
} from "./interaction.inputs";
import {
  InteractionCreateResponse,
  InteractionPaginateResponse,
} from "./interaction.response";

@Resolver(Interaction)
class InteractionResolver {
  private controller: InteractionController;

  constructor() {
    this.controller = new InteractionController();
  }

  @Query(() => Interaction, InteractionDocs.InteractionQueryDocs)
  @Authorized()
  async findById(@Arg("id") id: string): Promise<Interaction> {
    const interaction = await this.controller.findById(id);
    return interaction;
  }

  @Query(
    () => InteractionPaginateResponse,
    InteractionDocs.InteractionPaginateResponseDocs,
  )
  @Authorized()
  async paginate(
    @Args() paginate: InteractionPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const userFrom = ctx.payload.id;
    const results = await this.controller.paginate({ userFrom, ...paginate });
    return results;
  }

  @Mutation(
    () => InteractionCreateResponse,
    InteractionDocs.InteractionCreateResponseDocs,
  )
  @Authorized()
  @ValidateArgs(InteractionInputCreate, "data")
  async create(
    @Arg("data") interactionInput: InteractionInputCreate,
    @Ctx() ctx: IContext,
    @PubSub(ISubscriptionsTypes.NOTIFICATIONS) publish: Publisher<Notification>,
  ) {
    const userFrom = ctx.payload.user;
    const { generatedMatch, interaction, userTo } =
      await this.controller.create(interactionInput, userFrom);

    if (generatedMatch) {
      const paramsTo = { from: userFrom.name, owner: interactionInput.userTo };
      const paramsFrom = { from: userTo.name, owner: userFrom._id };
      const { to, from } = await NotificationFactory.match(
        paramsTo,
        paramsFrom,
      );
      publish(to);
      publish(from);
    }

    if (!generatedMatch && interaction.type !== IInteractionTypes.rejected) {
      const likeParams = {
        from: userFrom.name,
        owner: interactionInput.userTo,
      };
      const notificationLike = await NotificationFactory.create(
        INotificationType.like,
        likeParams,
      );
      publish(notificationLike);
    }

    return interaction;
  }

  @Mutation(() => Interaction, InteractionDocs.InteractionMutationDocs)
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
