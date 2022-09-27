import { Types } from "mongoose";
import { ClassType, createMethodDecorator } from "type-graphql";
import { IdentifierError } from "../errors/identifier.error";

function ValidateIdentifier<T extends object>(
  Type: ClassType<T> | string,
  key?: string,
) {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = key ? args[key] : args;
    if (Types.ObjectId.isValid(instance)) return next();
    throw new IdentifierError("Invalid Identifier");
  });
}

export default ValidateIdentifier;
