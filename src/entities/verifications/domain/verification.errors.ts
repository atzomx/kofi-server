import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class VerificationNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Verification not found", property: "id" },
    ];
    super("Verification not found", { errors });
  }
}

export class VerificationAlreadyExistsError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      {
        constrains: "Verification already exists for this user",
        property: "userId",
      },
    ];
    super("Verification already exists for this user", { errors });
  }
}
