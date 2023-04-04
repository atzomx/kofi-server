import { UserPreference } from "@entities/users/domain/object-types";
import User from "@entities/users/domain/user.entity";
import { IUserRole } from "@entities/users/domain/user.enums";
import { prop } from "@typegoose/typegoose";
import { Authorized } from "type-graphql";

class UserFindById extends User {
  @prop({ required: false, default: null })
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  public preferences?: UserPreference;
}

export default UserFindById;
