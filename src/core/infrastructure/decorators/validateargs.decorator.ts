import { UserInputError } from "apollo-server-core";
import { validate } from "class-validator";
import { ClassType, createMethodDecorator } from "type-graphql";

function ValidateArgs<T extends object>(Type: ClassType<T>, key?: string) {
  return createMethodDecorator(async ({ args }, next) => {
    const instance = Object.assign(new Type(), key ? args[key] : args);
    const validationErrors = await validate(instance, {
      skipNullProperties: true,
    });
    if (validationErrors.length === 0) return next();

    const errors = validationErrors.map((error) => ({
      constrains: error.constraints,
      property: error.property,
    }));

    throw new UserInputError("Invalid Input", {
      errors,
    });
  });
}

export default ValidateArgs;
