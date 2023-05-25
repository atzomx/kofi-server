import { ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import Match from "../domain/match.entity";

@ObjectType()
export class MatchPaginateResponse extends PaginateResponse(Match) {}
