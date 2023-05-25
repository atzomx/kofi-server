import { UserInputError } from "apollo-server-core";
import { ICustomError } from "@core/domain/interfaces";

export class MediaNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Media not found", property: "id" },
    ];
    super("Media not found", { errors });
  }
}
