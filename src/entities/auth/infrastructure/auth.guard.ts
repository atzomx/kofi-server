import { IContext } from "@core/domain/interfaces";
import AuthUtils from "@core/infrastructure/utils/token.utils";
import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<IContext> = ({ context }) => {
  const { authorization } = context.req.headers;
  if (!authorization) return false;

  const [typo, token] = authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo)) return false;

  const payload = AuthUtils.verify(token);

  const { id } = payload as { id: string };
  context.payload = { id };

  return true;
};

export default authChecker;
