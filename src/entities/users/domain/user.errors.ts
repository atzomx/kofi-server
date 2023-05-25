import { UserInputError } from "apollo-server-core";
import { ICustomError } from "@core/domain/interfaces";

export class UserNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "User not found", property: "id" },
    ];
    super("User not found", { errors });
  }
}

export class UserAlreadyExistsError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "User already register", property: "user" },
      { constrains: "User already register", property: "email" },
    ];
    super("User already exists", { errors });
  }
}
