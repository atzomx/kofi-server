import { ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import Notification from "../domain/notification.entity";

@ObjectType()
export class NotificationPaginateResponse extends PaginateResponse(
  Notification,
) {}
