import { prop } from "@typegoose/typegoose";
import {
  MaxLength,
  MinLength,
  IsOptional,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsEmail,
} from "class-validator";
import { Field, InputType } from "type-graphql";
import {
  IUserInterests,
  IUserPersonality,
  IUserMaritalStatus,
  IUserLookingFor,
  IUserPets,
  IUserSexualOrientation,
  IUserStatus,
  IUserDegree,
  IUserReligion,
} from "../domain/user.enums";

@InputType()
export class UserInputCreate {
  @Field({ description: "Name." })
  @MinLength(1)
  @MaxLength(50)
  public name!: string;

  @Field({ description: "Username." })
  @MinLength(8)
  @MaxLength(16)
  public userName!: string;

  @Field({ description: "Email." })
  @IsEmail()
  public email!: string;

  @Field({ description: "User birthday YYYY-MM-DD." })
  public birthday!: Date;

  @Field({ description: "User description." })
  @MinLength(1)
  @MaxLength(200)
  public description!: string;

  @Field(() => IUserPersonality, { description: "User personality." })
  public personality?: IUserPersonality;

  @Field(() => [IUserInterests])
  @prop({ default: [] })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  public interest?: IUserInterests[];

  @Field(() => IUserMaritalStatus, { description: "User marital status." })
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { description: "Looking for." })
  public lookingFor?: IUserLookingFor;

  @Field({ description: "User job." })
  @MinLength(1)
  @MaxLength(50)
  public employer!: string;

  @Field(() => IUserPets, { description: "User pets." })
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    description: "User sexual orientation.",
  })
  public sexualOrientation?: IUserSexualOrientation;

  @Field({ description: "User location." })
  @MaxLength(30)
  public location!: string;

  @Field(() => IUserDegree, { description: "User degree." })
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { description: "User religion." })
  public religion?: IUserReligion;

  @Field({ description: "User nacionality." })
  @MaxLength(50)
  public nacionality?: string;

  @Field()
  @MinLength(8)
  @MaxLength(16)
  public password!: string;

  public status: IUserStatus = IUserStatus.pending;
}

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true, description: "Name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  public name?: string;

  @Field({ nullable: true, description: "User birthday YYYY-MM-DD." })
  @IsOptional()
  public birthday?: Date;

  @Field({ nullable: true, description: "User description." })
  @IsOptional()
  @MaxLength(200)
  public description?: string;

  @Field(() => IUserPersonality, {
    nullable: true,
    description: "User personality.",
  })
  @IsOptional()
  public personality?: IUserPersonality;

  @Field(() => [IUserInterests], {
    nullable: true,
    description: "User interest.",
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(5)
  public interest?: IUserInterests[];

  @Field(() => IUserMaritalStatus, {
    nullable: true,
    description: "User marital status.",
  })
  @IsOptional()
  public maritalStatus?: IUserMaritalStatus;

  @Field(() => IUserLookingFor, { nullable: true, description: "Looking for." })
  @IsOptional()
  public lookingFor?: IUserLookingFor;

  @Field({ nullable: true, description: "User job." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  public employer!: string;

  @Field(() => IUserPets, { nullable: true, description: "User pets." })
  @IsOptional()
  public pets?: IUserPets;

  @Field(() => IUserSexualOrientation, {
    nullable: true,
    description: "User sexual orientation.",
  })
  @IsOptional()
  public sexualOrientation?: IUserSexualOrientation;

  @Field({ nullable: true, description: "User location." })
  @IsOptional()
  @MaxLength(30)
  public location?: string;

  @Field(() => IUserDegree, { nullable: true, description: "User degree." })
  @IsOptional()
  public degree?: IUserDegree;

  @Field(() => IUserReligion, { nullable: true, description: "User religion." })
  @IsOptional()
  public religion?: IUserReligion;

  @Field({ nullable: true, description: "User nacionality." })
  @IsOptional()
  @MaxLength(50)
  public nacionality?: string;
}
