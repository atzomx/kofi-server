import { UserInputError } from "apollo-server-core";
import { ICustomError } from "@core/domain/interfaces";

export class IdentifierError extends UserInputError {
  constructor(message: string) {
    const errors: Array<ICustomError> = [
      { constrains: message, property: "id" },
    ];
    super("Identifier is not valid", { errors });
  }
}
