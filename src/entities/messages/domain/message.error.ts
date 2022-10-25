import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class ChatNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Chat not found", property: "id" },
    ];
    super("Chat not found", { errors });
  }
}
