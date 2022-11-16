import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import {
  IUserInterests,
  IUserPersonality,
  IUserMaritalStatus,
  IUserLookingFor,
  IUserPets,
  IUserSexualOrientation,
  IUserStatus,
  IUserDegree,
  IUserNacionality,
  IUserReligion,
} from "./user.enums";

@ObjectType()
class User extends Entity {
  @Field(() => ID, { description: "User identifier." })
  readonly _id?: Types.ObjectId;

  @Field({ description: "Name." })
  @prop({ required: true })
  public name!: string;

  @Field({ description: "UserName." })
  @prop({ required: true, unique: true })
  public userName!: string;

  // @Field({ description: "Medias." })
  // @prop({ required: true })
  // public nedias!: string;

  @Field({ description: "User birthday YYYY-MM-DD." })
  @prop({ required: true })
  public birthday!: Date;

  @Field({ description: "User description." })
  @prop({ required: false })
  public description?: string;

  @Field(() => [IUserInterests])
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
  public location!: string;

  @Field(() => IUserStatus, { description: "User status." })
  @prop({ required: false, enum: IUserStatus })
  public status?: IUserStatus;

  @Field(() => IUserDegree, { description: "User degree." })
  @prop({ required: false, enum: IUserDegree })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion." })
  @prop({ required: false, enum: IUserReligion })
  public religion?: IUserReligion;

  @Field(() => IUserNacionality, { description: "User nacionality." })
  @prop({ required: false, enum: IUserNacionality })
  public nacionality?: IUserNacionality;

  @prop({ required: true })
  public password!: string;
}

export default User;
