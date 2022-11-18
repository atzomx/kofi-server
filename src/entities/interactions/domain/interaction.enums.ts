import { registerEnumType } from "type-graphql";

export enum IInteractionTypes {
  "like" = "like",
  "rejected" = "rejected",
  "super_like" = "super_like",
}

registerEnumType(IInteractionTypes, {
  name: "Interaction",
  description: "Types for Interaction",
});
