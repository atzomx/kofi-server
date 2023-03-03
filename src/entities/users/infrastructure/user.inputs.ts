import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";
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
} from "../domain/user.enums";

@InputType()
export class UserInputCreate {
  @Field({ description: "User name" })
  @MinLength(1)
  @MaxLength(50)
  public name!: string;

  @Field({ description: "User email" })
  @IsEmail()
  public email!: string;

  @Field({ description: "User password" })
  @MinLength(8)
  @MaxLength(16)
  public password!: string;

  public status: IUserStatus = IUserStatus.pending;
  public role: IUserRole = IUserRole.LOVER;
}

@InputType()
export class AgeRangeInputUpdatePreference {
  @Field(() => Number, { description: "User min age range" })
  public min: number;

  @Field(() => Number, { description: "User max age range" })
  public max: number;
}

@InputType()
export class LocationInputUpdateInformation {
  @Field(() => Number, { description: "User location latitude" })
  public latitude: number;

  @Field(() => Number, { description: "User location longitude" })
  public longitude: number;
}

@InputType()
export class UserInputUpdatePreference {
  @Field(() => IUserPersonality, { description: "User personality" })
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status" })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for" })
  public lookingFor?: IUserLookingFor;

  @Field(() => IUserPets, { description: "User pets" })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation",
  })
  public sexualPreference?: IUserSexualOrientation;

  @Field(() => IUserDegree, { description: "User degree" })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion" })
  public religion?: IUserReligion;

  @Field(() => AgeRangeInputUpdatePreference, { description: "User age range" })
  public ageRange?: AgeRangeInputUpdatePreference;
}

@InputType()
export class UserInputUpdateInformation {
  @Field(() => [Types.ObjectId], { description: "Medias images" })
  public medias?: Types.ObjectId[];

  @Field({ description: "User birthday YYYY-MM-DD" })
  public birthday?: Date;

  @Field({ description: "User description" })
  public description?: string;

  @Field(() => IUserInterests, { description: "User interest" })
  public interest?: IUserInterests[];

  @Field(() => IUserPersonality, { description: "User personality" })
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status" })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for" })
  public lookingFor?: IUserLookingFor;

  @Field({ description: "User job" })
  public employer?: string;

  @Field(() => IUserPets, { description: "User pets" })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation",
  })
  public sexualOrientation?: IUserSexualOrientation;

  @Field(() => LocationInputUpdateInformation, { description: "User location" })
  public location?: LocationInputUpdateInformation;

  @Field(() => IUserDegree, { description: "User degree" })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion" })
  public religion?: IUserReligion;

  @Field({ description: "User nacionality" })
  public nacionality?: string;
}

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true, description: "User name" })
  @MinLength(1)
  @MaxLength(50)
  public name?: string;

  @Field({ nullable: true, description: "User preferences" })
  public preferences?: UserInputUpdatePreference;

  @Field({ nullable: true, description: "User information" })
  public information?: UserInputUpdateInformation;
}
