import { IContext } from "@core/domain/interfaces";
import { createMethodDecorator } from "type-graphql";
import { MethodAndPropDecorator } from "type-graphql/dist/decorators/types";

function OwnerProp() {
  return createMethodDecorator<IContext>(({ root, context }) => {
    if (context.payload.id === root._id.toString()) return root.preferences;
    return null;
  }) as MethodAndPropDecorator;
}

export default OwnerProp;
