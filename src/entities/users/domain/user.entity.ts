import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
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
}

export default User;
