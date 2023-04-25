import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class InteractionNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Interaction not found", property: "id" },
    ];
    super("Interaction not found", { errors });
  }
}
