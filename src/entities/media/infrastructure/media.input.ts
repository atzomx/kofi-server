import { IsOptional, MaxLength, IsUrl } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IMediaType } from "../domain/media.enum";

@InputType()
export class MediaCreateInput {
  @Field(() => IMediaType, { description: "Media Type." })
  public type!: IMediaType;

  @Field({ description: "Media URL" })
  @MaxLength(100)
  @IsUrl()
  public url!: string;
}

@InputType()
export class MediaUpdateInput {
  @Field({ nullable: true, description: "Media Type" })
  @IsOptional()
  public type?: IMediaType;

  @Field({ nullable: true, description: "Media URL" })
  @IsOptional()
  @MaxLength(100)
  @IsUrl()
  public url?: string;
}
