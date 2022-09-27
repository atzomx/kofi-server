import { IContext } from "@core/domain/interfaces";
import { AuthenticationError } from "apollo-server-core";
import { MiddlewareFn } from "type-graphql";
import AuthUtils from "../application/auth.utils";

export const IsAuth: MiddlewareFn<IContext> = ({ context }, next) => {
  const { authorization } = context.req.headers;

  if (!authorization) throw new AuthenticationError("Invalid token");

  const [typo, token] = authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo))
    throw new AuthenticationError("Invalid token");

  const payload = AuthUtils.verify(token);

  const { id } = payload as { id: string };
  context.payload = { id };

  return next();
};

export default { IsAuth };
