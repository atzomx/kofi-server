import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserMediaOrderInput {
  @Field(() => [Types.ObjectId], {
    description: "User medias ids with new order",
  })
  public medias: Types.ObjectId[];
}
