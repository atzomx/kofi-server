import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Notification from "../domain/notification.entity";

@ObjectType()
export class NotificationPaginateResponse extends PaginateResponse(
  Notification,
) {}
