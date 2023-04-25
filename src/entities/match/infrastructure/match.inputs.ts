import { Field, InputType } from "type-graphql";
import { IMatchStatus } from "../domain/match.enums";

@InputType()
export class MatchInputUpdate {
  @Field(() => IMatchStatus, { description: "match types." })
  public status!: IMatchStatus;
}
