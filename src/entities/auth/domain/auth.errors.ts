import { UserInputError } from "apollo-server-core";
import { ICustomError } from "@core/domain/interfaces";

export class InvalidCredentialsError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "userName or email not valid", property: "userName" },
      { constrains: "userName or email not valid", property: "password" },
    ];
    super("Invalid Credentials", { errors });
  }
}
