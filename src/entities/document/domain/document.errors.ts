import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class DocumentNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Document not found", property: "id" },
    ];
    super("Document not found", { errors });
  }
}

export class DocumentAlreadyExistError extends UserInputError {
  constructor(name: string) {
    const errors: Array<ICustomError> = [
      {
        constrains: `Document ${name} already exist for this user`,
        property: "name",
      },
    ];
    super("Document name already exists", { errors });
  }
}
