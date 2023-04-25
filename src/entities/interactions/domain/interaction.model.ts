import { getModelForClass } from "@typegoose/typegoose";
import Interaction from "./interaction.entity";

const InteractionModel = getModelForClass(Interaction, {
  schemaOptions: { timestamps: true },
});

export default InteractionModel;
