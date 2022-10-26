import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Chat from "../domain/chat.entity";

@ObjectType()
export class ChatPaginateResponse extends PaginateResponse(Chat) {}
