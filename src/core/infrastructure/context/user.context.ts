import { AuthenticationError } from "apollo-server-core";
import { IContext } from "@core/domain/interfaces";
import AuthUtils from "@core/infrastructure/utils/token.utils";
import { UserRepository } from "@entities/users";

const userContext = async (context: IContext) => {
  const { authorization } = context.req.headers;

  if (!authorization) {
    context.payload = { id: null, user: null };
    return context;
  }

  const [typo, token] = authorization.split(" ");
  if (!["Token", "Bearer"].includes(typo))
    throw new AuthenticationError("Invalid Credentials");

  const payload = AuthUtils.verify(token);

  const { id } = payload as { id: string };
  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);
  context.payload = { id, user };

  return context;
};

export default userContext;
