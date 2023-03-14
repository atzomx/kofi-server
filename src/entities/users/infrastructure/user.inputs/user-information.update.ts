import { IsOptional } from "class-validator";
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
  IUserSexualOrientation,
} from "../../domain/user.enums";

@InputType()
export class LocationInformationUpdate {
  public type = "Point";

  @Field(() => [Number, Number], { description: "User location coordinates" })
  public coordinates!: [number, number];
}

@InputType()
export class UserInformationUpdate {
  @Field(() => [Types.ObjectId], {
    description: "Medias images",
    nullable: true,
  })
  @IsOptional()
  public medias?: Types.ObjectId[];

  @Field({ description: "User birthday YYYY-MM-DD", nullable: true })
  @IsOptional()
  public birthday?: Date;

  @Field({ description: "User description", nullable: true })
  @IsOptional()
  public description?: string;

  @Field(() => [IUserInterests], {
    description: "User interest",
    nullable: true,
  })
  @IsOptional()
  public interest?: IUserInterests[];

  @Field(() => IUserPersonality, {
    description: "User personality",
    nullable: true,
  })
  @IsOptional()
  public personality?: IUserPersonality;

  @Field(() => IUserMaritalStatus, {
    description: "User marital status",
    nullable: true,
  })
  @IsOptional()
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for", nullable: true })
  @IsOptional()
  public lookingFor?: IUserLookingFor;

  @Field({ description: "User job", nullable: true })
  @IsOptional()
  public employer?: string;

  @Field(() => IUserPets, { description: "User pets", nullable: true })
  @IsOptional()
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation",
    nullable: true,
  })
  @IsOptional()
  public sexualOrientation?: IUserSexualOrientation;

  @Field(() => LocationInformationUpdate, {
    description: "User location",
    nullable: true,
  })
  @IsOptional()
  public location?: LocationInformationUpdate;

  @Field(() => IUserDegree, { description: "User degree", nullable: true })
  @IsOptional()
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion", nullable: true })
  @IsOptional()
  public religion?: IUserReligion;

  @Field({ description: "User nacionality", nullable: true })
  @IsOptional()
  public nacionality?: string;
}
