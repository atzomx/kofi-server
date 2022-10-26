import { getModelForClass } from "@typegoose/typegoose";
import Message from "./message.entity";

const MessageModel = getModelForClass(Message, {
  schemaOptions: { timestamps: true },
});

export default MessageModel;
