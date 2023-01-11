import { getModelForClass } from "@typegoose/typegoose";
import Media from "./media.entity";

const MediaModel = getModelForClass(Media, {
  schemaOptions: { timestamps: true },
});

export default MediaModel;
