import { Field, ObjectType } from "type-graphql";
import { PaginateResponse } from "@core/infrastructure/responses";
import User from "../domain/user.entity";

@ObjectType()
export class UserPaginateResponse extends PaginateResponse(User) {}

@ObjectType()
class UserQueue extends User {
  @Field({ description: "Distance km" })
  public distance: number;
}

@ObjectType()
export class UserPaginateResponseQueue extends PaginateResponse(UserQueue) {}
