import { createMethodDecorator } from "type-graphql";
import { MethodAndPropDecorator } from "type-graphql/dist/decorators/types";
import { IContext } from "@core/domain/interfaces";

function OwnerProp() {
  return createMethodDecorator<IContext>(({ root, context, info }) => {
    if (context.payload.id === root._id.toString()) return root[info.fieldName];
    return null;
  }) as MethodAndPropDecorator;
}

export default OwnerProp;
