import { PaginateArgs } from "@core/infrastructure/responses";
import { Types } from "mongoose";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class DocumentPaginateArgs extends PaginateArgs {
  @Field(() => String, { nullable: true })
  public owner?: Types.ObjectId;

  @Field(() => String, { nullable: true })
  public search?: string;
}

export default {
  DocumentPaginateArgs,
};
