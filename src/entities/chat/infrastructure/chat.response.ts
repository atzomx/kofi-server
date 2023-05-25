import { ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import { ChatOutput } from "./chat.outputs";

@ObjectType()
export class ChatPaginateResponse extends PaginateResponse(ChatOutput) {}
