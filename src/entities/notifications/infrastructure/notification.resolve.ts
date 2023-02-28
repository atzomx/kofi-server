import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import {
  Args,
  Authorized,
  Ctx,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import NotificationController from "../application/notification.controller";
import Notification from "../domain/notification.entity";
import { NotificationPaginationArgs } from "./notification.args";
import { NotificationPaginateResponse } from "./notification.response";

const NAMES = namerUtils.get("notification");

@Resolver(Notification)
class NotificationResolver {
  private controller: NotificationController;

  constructor() {
    this.controller = new NotificationController();
  }

  @Query(() => NotificationPaginateResponse, {
    description: "Returns an array of Notification by user.",
    name: NAMES.paginate,
  })
  @Authorized()
  async paginate(
    @Args() paginate: NotificationPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const user = ctx.payload.id;
    const results = await this.controller.paginate({ user, ...paginate });
    return results;
  }

  @Subscription({
    description: "Subscription for a notifications.",
    name: NAMES.new,
    topics: ISubscriptionsTypes.NOTIFICATIONS,
    filter: ({
      payload,
      context,
    }: {
      payload: Notification;
      context: IContext;
    }) => payload.owner.toString() === context.payload.id,
  })
  newNotification(@Root() notification: Notification): Notification {
    return {
      ...notification,
      createdAt: new Date(notification.createdAt),
      updatedAt: new Date(notification.updatedAt),
    };
  }
}

export default NotificationResolver;
