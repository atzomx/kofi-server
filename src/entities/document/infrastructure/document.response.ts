import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Document from "../domain/document.entity";

@ObjectType()
export class DocumentPaginateResponse extends PaginateResponse(Document) {}
