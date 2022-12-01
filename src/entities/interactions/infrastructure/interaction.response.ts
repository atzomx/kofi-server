import { PaginateResponse } from "@core/infrastructure/responses";
import { Field, ObjectType } from "type-graphql";
import Interaction from "../domain/interaction.entity";

@ObjectType()
export class InteractionPaginateResponse extends PaginateResponse(
  Interaction,
) {}

@ObjectType()
export class InteractionCreateResponse extends Interaction {
  @Field(() => Boolean, { description: "Response if match was created." })
  public generatedMatch: boolean;
}
