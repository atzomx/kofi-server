import { AuthChecker } from "type-graphql";
import { IContext } from "@core/domain/interfaces";

const authChecker: AuthChecker<IContext> = async (
  { context },
  roles: string[],
) => {
  const { user } = context.payload;
  if (!user) return false;
  if (roles.length === 0) return !!user;
  if (roles.includes(user.role)) return true;
  return false;
};

export default authChecker;
