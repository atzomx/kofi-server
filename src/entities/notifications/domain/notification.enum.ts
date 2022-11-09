import { registerEnumType } from "type-graphql";

export enum INotificationType {
  "like" = "like",
  "message" = "message",
  "match" = "match",
}

registerEnumType(INotificationType, {
  name: "NotificationType",
  description: "Notification type",
});
