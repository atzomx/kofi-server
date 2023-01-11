import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Media from "../domain/media.entity";

@ObjectType()
export class MediaPaginateResponse extends PaginateResponse(Media) {}
