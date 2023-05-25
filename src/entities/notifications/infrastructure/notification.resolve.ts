import {
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { ISubscriptionsTypes } from "@core/domain/enums";
import { IContext } from "@core/domain/interfaces";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import { UserRepository } from "@entities/users";
import { NotificationPaginationArgs } from "./notification.args";
import { NotificationDocs } from "./notification.docs";
import { NotificationPaginateResponse } from "./notification.response";
import NotificationController from "../application/notification.controller";
import Notification from "../domain/notification.entity";
import { INotificationType } from "../domain/notification.enum";

const NAMES = namerUtils.get("notification");

@Resolver(Notification)
class NotificationResolver {
  private controller: NotificationController;

  constructor() {
    this.controller = new NotificationController();
  }

  @Query(
    () => NotificationPaginateResponse,
    NotificationDocs.NotificationPaginateResponseDocs,
  )
  @Authorized()
  async paginate(
    @Args() paginate: NotificationPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const user = ctx.payload.id;
    const results = await this.controller.paginate({ user, ...paginate });
    return results;
  }

  @FieldResolver()
  async from(@Root() notification: Notification) {
    if (notification.type === INotificationType.like || !notification.from)
      return null;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(notification.from);
    return user;
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
