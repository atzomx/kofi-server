import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";
import Verification from "./verification.entity";

export class VerificationNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Verification not found", property: "id" },
    ];
    super("Verification not found", { errors });
  }
}

export class VerificationAlreadyExistsError extends UserInputError {
  constructor(
    existingVerification: Verification,
    inputVerification: Verification,
  ) {
    const uniqueValues = ["userId"];
    const errors = uniqueValues.reduce((acc, current) => {
      if (existingVerification[current] !== inputVerification[current])
        return acc;
      return [
        ...acc,
        {
          constrains: `Verification ${current} already exists`,
          property: current,
        },
      ];
    }, [] as Array<ICustomError>);
    super("Verification already exists", { errors });
  }
}
