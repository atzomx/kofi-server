import { ArgsType, Field } from "type-graphql";
import { PaginateArgs } from "@core/infrastructure/responses";
import { IInteractionTypes } from "../domain/interaction.enums";

@ArgsType()
export class InteractionPaginationArgs extends PaginateArgs {
  @Field(() => IInteractionTypes, {
    nullable: true,
    description: "Interaction types.",
  })
  public type?: IInteractionTypes;
}
