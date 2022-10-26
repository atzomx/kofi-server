import { getModelForClass } from "@typegoose/typegoose";
import Notification from "./notification.entity";

const NotificationModel = getModelForClass(Notification, {
  schemaOptions: { timestamps: true },
});

export default NotificationModel;
