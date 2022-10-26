import { registerEnumType } from "type-graphql";

export enum IMessageType {
  "sent" = "sent",
  "received" = "received",
  "read" = "read",
}

registerEnumType(IMessageType, {
  name: "MessageType",
  description: "Message type",
});
