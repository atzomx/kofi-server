import { registerEnumType } from "type-graphql";

export enum IMediaType {
  "png" = "png",
  "jpg" = "jpg",
  "jpeg" = "jpeg",
  "gif" = "gif",
}

registerEnumType(IMediaType, {
  name: "Type",
  description: "Media Type.",
});
