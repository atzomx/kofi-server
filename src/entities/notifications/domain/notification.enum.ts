import { registerEnumType } from "type-graphql";

export enum INotificationType {
  "like" = "like",
  "message" = "message",
  "match" = "match",
}

export enum INotificationStatus {
  "unread" = "unread",
  "seen_and_read" = "seen_and_read",
  "seen_but_unread" = "seen_but_unread",
}

registerEnumType(INotificationType, {
  name: "NotificationType",
  description: "Notification type",
});

registerEnumType(INotificationStatus, {
  name: "NotificationStatus",
  description: "Notification status",
});
