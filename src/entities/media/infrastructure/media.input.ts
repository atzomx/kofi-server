import { IsOptional, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IMediaType } from "../domain/media.enum";


@InputType()
export class MediaInputCreate {
  @Field({ description: "Media Type." })
  public mediaType!: IMediaType;

  @Field({ description: "Media URL" })
  @MaxLength(100)
  public mediaUrl!: string;
}

@InputType()
export class MediaInputUpdate {
  @Field({ nullable: true, description: "Media Type" })
  @IsOptional()
  public mediaType?: IMediaType;

  @Field({nullable: true, description: "Media URL" })
  @IsOptional()
  @MaxLength(100)
  public mediaUrl?: string;
}