import { ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import Message from "../domain/message.entity";

@ObjectType()
export class MessagePaginateResponse extends PaginateResponse(Message) {}
