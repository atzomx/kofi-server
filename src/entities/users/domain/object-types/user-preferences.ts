import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import {
  IUserDegree,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserSexualOrientation,
} from "../user.enums";

@ObjectType("distance")
export class DistanceRangePreference {
  @Field(() => Number, { description: "User min distance range km" })
  @prop({ required: false, default: 0 })
  public min: number;

  @Field(() => Number, { description: "User max distance range km" })
  @prop({ required: false, default: 0 })
  public max: number;
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

  @Field(() => DistanceRangePreference, { description: "User distance range" })
  @prop({ required: false })
  public distance?: DistanceRangePreference;
}

export default UserPreference;
