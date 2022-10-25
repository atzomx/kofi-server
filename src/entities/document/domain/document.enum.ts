import { registerEnumType } from "type-graphql";

export enum IDocumentType {
  "pdf" = "pdf",
  "jpeg" = "jpeg",
  "png" = "png",
}

registerEnumType(IDocumentType, {
  name: "DocumentType",
  description: "Document type",
});
