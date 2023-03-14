import { IsOptional, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { UserInformationUpdate } from "./user-information.update";
import { UserPreferenceUpdate } from "./user-preferences.update";

@InputType()
export class UserInputUpdate {
  @Field({ nullable: true, description: "User name" })
  @IsOptional()
  @MinLength(1)
  @MaxLength(50)
  public name?: string;

  @Field({ nullable: true, description: "User preferences" })
  @IsOptional()
  public preferences?: UserPreferenceUpdate;

  @Field({ nullable: true, description: "User information" })
  @IsOptional()
  public information?: UserInformationUpdate;
}
