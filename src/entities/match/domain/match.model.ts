import { getModelForClass } from "@typegoose/typegoose";
import Match from "./match.entity";

const MatchModel = getModelForClass(Match, {
  schemaOptions: { timestamps: true },
});

export default MatchModel;
