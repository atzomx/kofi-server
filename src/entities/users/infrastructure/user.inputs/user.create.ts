import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IUserRole, IUserStatus } from "../../domain/user.enums";

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
