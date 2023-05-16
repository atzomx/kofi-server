import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import { ChatOutput } from "./chat.outputs";

@ObjectType()
export class ChatPaginateResponse extends PaginateResponse(ChatOutput) {}
