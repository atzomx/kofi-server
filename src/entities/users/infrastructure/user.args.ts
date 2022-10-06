import { PaginateArgs } from "@core/infrastructure/responses";
import { ArgsType, Field } from "type-graphql";
import { IUserGender, IUserStatus } from "../domain/user.enums";

@ArgsType()
export class UserPaginationArgs extends PaginateArgs {
  @Field(() => String, { nullable: true, description: "User search text." })
  public search?: string;

  @Field(() => IUserStatus, { nullable: true, description: "User status." })
  public status?: IUserStatus;

  @Field(() => Date, {
    nullable: true,
    description: "User start creation date.",
  })
  public startDate?: Date;

  @Field(() => Date, {
    nullable: true,
    description: "User start creation date.",
  })
  public endDate?: Date;

  @Field(() => IUserGender, {
    nullable: true,
    description: "User gender.",
  })
  public gender?: IUserGender;
}
