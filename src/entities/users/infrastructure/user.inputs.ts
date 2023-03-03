import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
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
} from "../domain/user.enums";

@InputType()
export class UserInputCreate {
  @Field({ description: "Name." })
  @MinLength(1)
  @MaxLength(50)
  public name!: string;

  @Field({ description: "Email." })
  @IsEmail()
  public email!: string;

  @Field()
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
export class UserInputUpdatePreference {
  @Field(() => IUserPersonality, { description: "User personality." })
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status." })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for." })
  public lookingFor?: IUserLookingFor;

  @Field(() => IUserPets, { description: "User pets." })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation.",
  })
  public sexualPreference?: IUserSexualOrientation;

  @Field(() => IUserDegree, { description: "User degree." })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion." })
  public religion?: IUserReligion;

  @Field(() => AgeRangeInputUpdatePreference, { description: "User age range" })
  public ageRange?: AgeRangeInputUpdatePreference;
}

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true, description: "User name" })
  @MinLength(1)
  @MaxLength(50)
  public name?: string;

  @Field({ nullable: true, description: "User preferences" })
  public preferences?: UserInputUpdatePreference;
}
