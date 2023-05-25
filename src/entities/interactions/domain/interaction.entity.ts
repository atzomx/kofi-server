import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import Entity from "@core/domain/entity";
import { IInteractionTypes } from "./interaction.enums";

@ObjectType()
class Interaction extends Entity {
  @Field(() => ID, { description: "Interaction identifier." })
  readonly _id?: Types.ObjectId;

  @Field(() => String, {
    description: "User profile interaction from.",
  })
  @prop({ required: true })
  readonly userFrom!: Types.ObjectId;

  @Field(() => String, {
    description: "User profile interaction to.",
  })
  @prop({ required: true })
  readonly userTo!: Types.ObjectId;

  @Field(() => IInteractionTypes, { description: "Interaction type." })
  @prop({ required: true, enum: IInteractionTypes })
  public type!: IInteractionTypes;
}

export default Interaction;
