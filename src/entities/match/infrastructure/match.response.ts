import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Match from "../domain/match.entity";

@ObjectType()
export class MatchPaginateResponse extends PaginateResponse(Match) {}
