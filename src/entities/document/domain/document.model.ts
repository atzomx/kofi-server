import { getModelForClass } from "@typegoose/typegoose";
import Document from "./document.entity";

const DocumentModel = getModelForClass(Document, {
  schemaOptions: { timestamps: true },
});

export default DocumentModel;
