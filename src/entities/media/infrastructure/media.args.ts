import { PaginateArgs } from "@core/infrastructure/responses";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class MediaPaginationArgs extends PaginateArgs {
  @Field(() => String, { nullable: true, description: "Media search text." })
  public search?: string;

  @Field(() => Date, {
    nullable: true,
    description: "Media start creation date.",
  })
  public startDate?: Date;

  @Field(() => Date, {
    nullable: true,
    description: "Media start creation date.",
  })
  public endDate?: Date;
}
