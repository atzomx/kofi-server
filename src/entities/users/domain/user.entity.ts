import Entity from "@core/domain/entity";
import { Media } from "@entities/media";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import {
  IUserDegree,
  IUserInterests,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserRole,
  IUserSexualOrientation,
  IUserStatus,
} from "./user.enums";

@ObjectType("location")
export class LocationInformation {
  @Field(() => Number, { description: "User location latitude" })
  @prop({ required: true })
  public latitude: number;

  @Field(() => Number, { description: "User location longitude" })
  @prop({ required: true })
  public longitude: number;
}

@ObjectType("information")
export class UserInformation {
  @Field(() => [Media], { description: "Chat participants." })
  @prop({
    type: () => [Types.ObjectId],
    ref: Media,
    default: [],
  })
  public medias?: Ref<Media, string>[];

  @Field({ description: "User birthday YYYY-MM-DD." })
  @prop({ required: true })
  public birthday?: Date;

  @Field({ description: "User description." })
  @prop({ required: false })
  public description?: string;

  @Field(() => [IUserInterests], { description: "User interest." })
  @prop({ required: false, type: () => [String], enum: IUserInterests })
  public interest?: IUserInterests[];

  @Field(() => IUserPersonality, { description: "User personality." })
  @prop({ required: false, enum: IUserPersonality })
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status." })
  @prop({ required: false, enum: IUserMaritalStatus })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for." })
  @prop({ required: false, enum: IUserLookingFor })
  public lookingFor?: IUserLookingFor;

  @Field({ description: "User job." })
  @prop({ required: false })
  public employer?: string;

  @Field(() => IUserPets, { description: "User pets." })
  @prop({ required: false, enum: IUserPets })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation.",
  })
  @prop({ required: false, enum: IUserSexualOrientation })
  public sexualOrientation?: IUserSexualOrientation;

  @Field({ description: "User location." })
  @prop({ required: true })
  public location!: LocationInformation;

  @Field(() => IUserDegree, { description: "User degree." })
  @prop({ required: false, enum: IUserDegree })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion." })
  @prop({ required: false, enum: IUserReligion })
  public religion?: IUserReligion;

  @Field(() => String, { description: "User nacionality." })
  @prop({ required: false })
  public nacionality?: string;
}

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

  @Field(() => AgeRangePreference, { description: "User age range" })
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

  @Field({ description: "User preferences", nullable: true })
  @prop({ required: false, default: null })
  public preferences?: UserPreference;

  @Field({ description: "User information", nullable: true })
  @prop({ required: false, default: null })
  public information?: UserInformation;
}

export default User;
