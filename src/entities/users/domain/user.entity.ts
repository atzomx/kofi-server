import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import {
  IUserDegree,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserRole,
  IUserSexualOrientation,
  IUserStatus,
} from "./user.enums";

@ObjectType("ageRange")
export class AgeRangePreference {
  @Field(() => Number, { description: "User min age range" })
  @prop({ required: false, default: 0 })
  public min: number;

  @Field(() => Number, { description: "User max age range" })
  @prop({ required: false, default: 0 })
  public max: number;
}

@ObjectType("preferences")
export class UserPreference {
  @Field(() => IUserPersonality, { description: "User personality." })
  @prop({ required: false, enum: IUserPersonality })
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status." })
  @prop({ required: false, enum: IUserMaritalStatus })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for." })
  @prop({ required: false, enum: IUserLookingFor })
  public lookingFor?: IUserLookingFor;

  @Field(() => IUserPets, { description: "User pets." })
  @prop({ required: false, enum: IUserPets })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation.",
  })
  @prop({ required: false, enum: IUserSexualOrientation })
  public sexualPreference?: IUserSexualOrientation;

  @Field(() => IUserDegree, { description: "User degree." })
  @prop({ required: false, enum: IUserDegree })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion." })
  @prop({ required: false, enum: IUserReligion })
  public religion?: IUserReligion;

  @Field({ description: "User age range" })
  @prop({ required: false })
  public ageRange?: AgeRangePreference;
}

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

  @Field({ description: "User age range", nullable: true })
  @prop({ required: false, default: null })
  public preferences?: UserPreference;
}

export default User;
