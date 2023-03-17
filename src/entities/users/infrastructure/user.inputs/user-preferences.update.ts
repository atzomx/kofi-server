import { IsOptional, Max, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import {
  IUserDegree,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserSexualOrientation,
} from "../../domain/user.enums";

@InputType()
export class DistanceRangePreferenceUpdate {
  @Field(() => Number, { description: "User min distance range" })
  @Min(0)
  @Max(10)
  public min: number;

  @Field(() => Number, { description: "User max distance range" })
  @Min(1)
  @Max(200)
  public max: number;
}

@InputType()
export class AgeRangePreferenceUpdate {
  @Field(() => Number, { description: "User min age range" })
  @Min(18)
  @Max(99)
  public min: number;

  @Field(() => Number, { description: "User max age range" })
  @Min(19)
  @Max(100)
  public max: number;
}

@InputType()
export class UserPreferenceUpdate {
  @Field(() => IUserPersonality, { description: "User personality" })
  @IsOptional()
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, { description: "User marital status" })
  @IsOptional()
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for" })
  @IsOptional()
  public lookingFor?: IUserLookingFor;

  @Field(() => IUserPets, { description: "User pets" })
  @IsOptional()
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation",
  })
  @IsOptional()
  public sexualPreference?: IUserSexualOrientation;

  @Field(() => IUserDegree, { description: "User degree" })
  @IsOptional()
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion" })
  @IsOptional()
  public religion?: IUserReligion;

  @Field(() => AgeRangePreferenceUpdate, { description: "User age range" })
  @IsOptional()
  public ageRange?: AgeRangePreferenceUpdate;

  @Field(() => DistanceRangePreferenceUpdate, {
    description: "User distance range",
  })
  @IsOptional()
  public distance?: DistanceRangePreferenceUpdate;
}
