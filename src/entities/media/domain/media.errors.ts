import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class MediaNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Media not found", property: "id"},
    ];
    super("Media not found", { errors });
  }
}