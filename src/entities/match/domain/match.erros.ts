import { UserInputError } from "apollo-server-core";
import { ICustomError } from "@core/domain/interfaces";

export class MatchNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Match not found", property: "id" },
    ];
    super("Match not found", { errors });
  }
}
