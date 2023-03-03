import { IContext } from "@core/domain/interfaces";
import tokenUtils from "../utils/token.utils";

export const socket = async (context: IContext) => {
  const { authorization } = context.connectionParams || {};

  if (!authorization) return false;
  const [typo, token] = authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo)) return false;

  const payload = tokenUtils.verify(token);

  const { id } = payload as { id: string };
  context.payload = { id, user: null };

  return true;
};

export default { socket };
