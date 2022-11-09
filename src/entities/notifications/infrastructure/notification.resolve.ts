import { IContext } from "@core/domain/interfaces";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import { AuthMiddleware } from "@entities/auth";
import { Args, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import NotificationController from "../application/Notification.controller";
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
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(
    @Args() paginate: NotificationPaginationArgs,
    @Ctx() ctx: IContext,
  ) {
    const user = ctx.payload.id;
    const results = await this.controller.paginate({ user, ...paginate });
    return results;
  }
}

export default NotificationResolver;
