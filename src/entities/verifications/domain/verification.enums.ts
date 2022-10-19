import { registerEnumType } from "type-graphql";

export enum IVerificationPoses {
  "hand" = "hand",
  "eye" = "eye",
  "smile" = "smile",
}

export enum IVerificationStatus {
  "success" = "success",
  "banned" = "banned",
  "pending" = "pending",
  "rejected" = "rejected",
  "retry" = "retry",
}

registerEnumType(IVerificationPoses, {
  name: "Poses",
  description: "Poses for Verification",
});

registerEnumType(IVerificationStatus, {
  name: "Status",
  description: "Verification status",
});
