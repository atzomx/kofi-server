import { registerEnumType } from "type-graphql";

export enum IMatchStatus {
  "actived" = "actived",
  "disabled" = "disabled",
  "rejected" = "rejected",
}

registerEnumType(IMatchStatus, {
  name: "MatchStatus",
  description: "Status for Match",
});
