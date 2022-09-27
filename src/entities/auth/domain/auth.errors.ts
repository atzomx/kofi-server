import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class InvalidCredentialsError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "userName or email not valid", property: "userName" },
      { constrains: "password not valid", property: "password" },
    ];
    super("Invalid Credentials", { errors });
  }
}
