import { Length, MaxLength, MinLength, IsOptional } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IUserGender, IUserStatus } from "../domain/user.enums";

@InputType()
export class UserInputCreate {
  @Field({ description: "First name of user." })
  @MinLength(1)
  @MaxLength(30)
  public firstName!: string;

  @Field({ description: "User last name." })
  @MinLength(1)
  @MaxLength(30)
  public lastName!: string;

  @Field({ nullable: true, description: "User second last name." })
  @MinLength(1)
  @MaxLength(30)
  public secondLastName?: string;

  @Field({ description: "User profile image." })
  public image?: string;

  @Field({ description: "Identifying number." })
  @Length(18)
  public curp!: string;

  @Field(() => IUserGender, { description: "User gender." })
  public gender!: IUserGender;

  @Field({ description: "User birthday YYYY-MM-DD." })
  public birthday!: Date;

  @Field({ description: "User phone number." })
  @MinLength(7)
  @MaxLength(15)
  public phoneNumber!: string;

  @Field({ description: "User email." })
  public email!: string;

  @Field()
  @MinLength(8)
  @MaxLength(16)
  public password!: string;

  @Field({ description: "Username." })
  @MinLength(8)
  @MaxLength(16)
  public userName!: string;

  public status: IUserStatus = IUserStatus.pending;
}

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true, description: "First name of user." })
  @IsOptional()
  @MaxLength(30)
  public firstName?: string;

  @Field({ nullable: true, description: "User last name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public lastName?: string;

  @Field({ nullable: true, description: "User second last name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(30)
  public secondLastName?: string;

  @Field({ nullable: true, description: "Identifying number." })
  @IsOptional()
  @Length(18, 18)
  public curp?: string;

  @Field(() => IUserGender, { nullable: true, description: "User gender." })
  @IsOptional()
  public gender?: IUserGender;

  @Field({ nullable: true, description: "User birthday YYYY-MM-DD." })
  @IsOptional()
  public birthday?: Date;

  @Field({ nullable: true, description: "User phone number." })
  @IsOptional()
  @MaxLength(15)
  public phoneNumber?: string;
}
