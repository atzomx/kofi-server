import Entity from "@core/domain/entity";
import { prop } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { IMediaType } from "./media.enum";

@ObjectType()
class Media extends Entity {
  @Field(() => ID, { description: "Media identifier." })
  readonly _id?: Types.ObjectId;

  @Field(() => IMediaType, { description: "Media Type." })
  @prop({ required: false, enum: IMediaType })
  public mediaType!: IMediaType;

  @Field({ description: "Media URL."})
  @prop({ required: true})
  public mediaUrl!: string;
}

export default Media;