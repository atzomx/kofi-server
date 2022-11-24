import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Interaction from "../domain/interaction.entity";

@ObjectType()
export class InteractionPaginateResponse extends PaginateResponse(
  Interaction,
) {}
