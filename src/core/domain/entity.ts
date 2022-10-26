import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Entity {
  @Field(() => Date, { nullable: true, description: "Creation YYYY-MM-DD." })
  @prop({ required: false })
  public createdAt?: Date;

  @Field(() => Date, { nullable: true, description: "Update YYYY-MM-DD." })
  @prop({ required: false })
  public updatedAt?: Date;
}

export default Entity;
