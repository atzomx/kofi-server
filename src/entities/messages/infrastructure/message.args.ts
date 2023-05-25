import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";
import { PaginateArgs } from "@core/infrastructure/responses";

@ArgsType()
export class MessagePaginationArgs extends PaginateArgs {
  @Field(() => String, { nullable: true, description: "Chat to paginate" })
  public chat!: Types.ObjectId;
}
