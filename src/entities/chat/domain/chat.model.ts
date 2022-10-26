import { getModelForClass } from "@typegoose/typegoose";
import Chat from "./chat.entity";

const MessageModel = getModelForClass(Chat, {
  schemaOptions: { timestamps: true },
});

export default MessageModel;
