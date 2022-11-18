import { Types } from "mongoose";
import { Field, InputType } from "type-graphql";
import { IInteractionTypes } from "../domain/interaction.enums";

@InputType()
export class InteractionInputCreate {
  @Field(() => String, { description: "User profile interaction from." })
  public userFrom!: Types.ObjectId;

  @Field(() => String, { description: "User profile interaction to." })
  public userTo!: Types.ObjectId;

  @Field(() => IInteractionTypes, { description: "Interaction types." })
  public type!: IInteractionTypes;

  public createdAt: Date = new Date();
}

@InputType()
export class InteractionInputUpdate {
  @Field(() => IInteractionTypes, { description: "Interaction types." })
  public type!: IInteractionTypes;
}
