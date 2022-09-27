import { registerEnumType } from "type-graphql";

export enum IUserGender {
  "male" = "male",
  "female" = "female",
  "other" = "other",
}

export enum IUserStatus {
  "active" = "active",
  "banned" = "banned",
  "pending" = "pending",
}

registerEnumType(IUserGender, {
  name: "Gender",
  description: "People gender",
});

registerEnumType(IUserStatus, {
  name: "Status",
  description: "User status",
});
