import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { INotificationStatus, INotificationType } from "./notification.enum";

@ObjectType()
class Notification extends Entity {
  @Field(() => ID)
  readonly _id?: Types.ObjectId;

  @Field(() => INotificationStatus, { description: "Notification is readed" })
  @prop({ required: false })
  public status?: INotificationStatus;

  @Field(() => INotificationType, { description: "Notification type" })
  @prop({ required: true })
  public type!: INotificationType;

  @Field(() => String, { description: "Notification owner" })
  @prop({ required: true })
  public owner!: Types.ObjectId;

  @Field(() => String, { description: "Notification from origin" })
  @prop({ required: true })
  public from!: string;

  @Field(() => String, { description: "Notification leyend" })
  @prop({ required: true })
  public leyend!: string;

  @Field(() => String, { description: "Notification message" })
  @prop({ required: true })
  public message!: string;

  @Field(() => String, { description: "Notification reference" })
  @prop({ required: true })
  public idReference!: string;
}

export default Notification;
