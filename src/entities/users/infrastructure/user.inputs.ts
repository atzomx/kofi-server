import { IsEmail, IsOptional, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IUserRole, IUserStatus } from "../domain/user.enums";

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
export class UserInputUpdate {
  @Field({ nullable: true, description: "Name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  public name?: string;
}
