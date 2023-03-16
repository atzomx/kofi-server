import { Media } from "@entities/media";
import { index, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import {
  IUserDegree,
  IUserInterests,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserSexualOrientation,
} from "../user.enums";

@ObjectType("location")
export class LocationInformation {
  @Field(() => String, { description: "User location geo type" })
  @prop({ required: false, default: "Point" })
  public type: string;

  @Field(() => [Number, Number], { description: "User location coordinates" })
  @prop({ required: true, type: [Number, Number] })
  public coordinates: [number, number];
}

@ObjectType("information")
@index({ location: "2dsphere" })
export class UserInformation {
  @Field(() => [Media], { description: "User image medias." })
  @prop({
    type: () => [Types.ObjectId],
    ref: Media,
    default: [],
  })
  public medias?: Ref<Media, string>[];

  @Field({ description: "User birthday YYYY-MM-DD." })
  @prop({ required: false })
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

  @Field(() => LocationInformation, { description: "User location." })
  @prop({ required: false })
  public location?: LocationInformation;

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

export default UserInformation;
