import { IContext } from "@core/domain/interfaces";
import authUtils from "../application/auth.utils";

export const socket = async (context: IContext) => {
  const { Authorization } = context.connectionParams || {};

  if (!Authorization) return false;
  const [typo, token] = Authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo)) return false;

  const payload = authUtils.verify(token);

  const { id } = payload as { id: string };
  context.payload = { id };

  return true;
};

export default { socket };
