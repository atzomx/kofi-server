import { getModelForClass } from "@typegoose/typegoose";
import Verification from "./verification.entity";

const VerificationModel = getModelForClass(Verification, {
  schemaOptions: { timestamps: true },
});

export default VerificationModel;
