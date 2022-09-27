import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import User from "../domain/user.entity";

@ObjectType()
export class UserPaginateResponse extends PaginateResponse(User) {}
