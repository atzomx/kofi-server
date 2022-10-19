import { PaginateArgs } from "@core/infrastructure/responses";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class MessagePaginationArgs extends PaginateArgs {
  @Field(() => String, { nullable: true, description: "Chat to paginate" })
  public chat!: string;
}
