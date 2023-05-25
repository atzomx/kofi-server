import { ArgsType, Field } from "type-graphql";
import { PaginateArgs } from "@core/infrastructure/responses";
import { IMatchStatus } from "../domain/match.enums";

@ArgsType()
export class MatchPaginationArgs extends PaginateArgs {
  @Field(() => IMatchStatus, {
    nullable: true,
    description: "Match types.",
  })
  public status?: IMatchStatus;
}
