import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";
import User from "./user.entity";

export class UserNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "User not found", property: "id" },
    ];
    super("User not found", { errors });
  }
}

export class UserAlreadyExistsError extends UserInputError {
  constructor(existingUser: User, inputUser: User) {
    const uniqueValues = ["curp", "email", "userName"];
    const errors = uniqueValues.reduce((acc, current) => {
      if (existingUser[current] !== inputUser[current]) return acc;
      return [
        ...acc,
        { constrains: `User ${current} already exists`, property: current },
      ];
    }, [] as Array<ICustomError>);
    super("User already exists", { errors });
  }
}
