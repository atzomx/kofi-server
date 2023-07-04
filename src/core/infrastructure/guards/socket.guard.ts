import { IContext } from "@core/domain/interfaces";
import tokenUtils from "../utils/token.utils";

export const socket = async (context: IContext) => {
  const { Authorization } = context.connectionParams || {};

  if (!Authorization) return false;
  const [typo, token] = Authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo)) return false;

  const payload = tokenUtils.verify(token);

  const { id } = payload as { id: string };
  context.payload = { id, user: null };

  return true;
};

export default { socket };
