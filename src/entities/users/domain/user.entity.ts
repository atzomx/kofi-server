import Entity from "@core/domain/entity";
import { OwnerProp } from "@core/infrastructure/decorators";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { UserInformation, UserPreference } from "./object-types";
import { IUserRole, IUserStatus } from "./user.enums";

@ObjectType()
class User extends Entity {
  @Field(() => ID, { description: "User identifier." })
  readonly _id?: Types.ObjectId;

  @Field({ description: "Name." })
  @prop({ required: true })
  public name!: string;

  @Field({ description: "Email." })
  @prop({ required: true, unique: true })
  public email!: string;

  @Field(() => IUserStatus, { description: "User status." })
  @prop({ required: true, enum: IUserStatus })
  public status!: IUserStatus;

  @prop({ required: true, enum: IUserRole, default: IUserRole.LOVER })
  public role!: IUserRole;

  @prop({ required: true })
  public password!: string;

  @Field({ description: "User information", nullable: true })
  @prop({ required: false, default: null })
  public information?: UserInformation;

  @Field({ description: "User preferences", nullable: true })
  @prop({ required: false, default: null })
  @OwnerProp()
  public preferences?: UserPreference;
}

export default User;
