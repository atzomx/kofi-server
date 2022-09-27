import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IUserGender, IUserStatus } from "./user.enums";

@ObjectType()
class User {
  @Field(() => ID, { description: "User identifier." })
  readonly _id?: Types.ObjectId;

  @Field({ description: "First name of user." })
  @prop({ required: true })
  public firstName!: string;

  @Field({ description: "User last name." })
  @prop({ required: true })
  public lastName!: string;

  @Field({ description: "User second last name." })
  @prop({ required: true })
  public secondLastName?: string;

  @Field({ description: "Normalized user full name." })
  @prop({ required: false, index: 1 })
  public normalizedFullName?: string;

  @Field({ description: "User profile image." })
  @prop({ required: false })
  public image?: string;

  @Field({ description: "Identifying number." })
  @prop({ required: true, unique: true })
  public curp!: string;

  @Field(() => IUserGender, { description: "User gender." })
  @prop({ required: true, enum: IUserGender })
  public gender!: IUserGender;

  @Field({ description: "User birthday YYYY-MM-DD." })
  @prop({ required: true })
  public birthday!: Date;

  @Field({ description: "User phone number." })
  @prop({ required: true })
  public phoneNumber!: string;

  @Field({ description: "User email." })
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @Field({ description: "Username." })
  @prop({ required: true, unique: true })
  public userName!: string;

  @Field(() => IUserStatus, { description: "User status." })
  @prop({ required: true, enum: IUserStatus })
  public status!: IUserStatus;
}

export default User;
