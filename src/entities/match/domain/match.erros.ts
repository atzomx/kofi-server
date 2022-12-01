import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class MatchNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Match not found", property: "id" },
    ];
    super("Match not found", { errors });
  }
}
