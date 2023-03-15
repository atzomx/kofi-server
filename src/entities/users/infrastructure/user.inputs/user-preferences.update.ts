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
export class AgeRangePreferenceUpdate {
  @Field(() => Number, { description: "User min age range" })
  public min: number;

  @Field(() => Number, { description: "User max age range" })
  public max: number;
}

@InputType()
export class UserPreferenceUpdate {
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

  @Field(() => AgeRangePreferenceUpdate, { description: "User age range" })
  public ageRange?: AgeRangePreferenceUpdate;
}
