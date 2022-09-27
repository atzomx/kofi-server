import { IsOptional, MaxLength, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { Types } from "mongoose";
import { IDocumentType } from "../domain/document.enum";

@InputType()
export class DocumentInputCreate {
  @Field(() => String)
  public owner!: Types.ObjectId;

  @Field(() => IDocumentType, { description: "Document type." })
  public type!: IDocumentType;

  @Field({ description: "Document url." })
  @MinLength(1)
  @MaxLength(100)
  public url!: string;

  @Field({ description: "Document name." })
  @MinLength(1)
  @MaxLength(35)
  public name!: string;
}

@InputType()
export class DocumentInputUpdate {
  @Field(() => IDocumentType, { description: "Document type." })
  @IsOptional()
  public type?: IDocumentType;

  @Field({ nullable: true, description: "Document url." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  public url?: string;

  @Field({ nullable: true, description: "Document name." })
  @IsOptional()
  @MinLength(1)
  @MaxLength(35)
  public name?: string;
}

export default { DocumentInputCreate, DocumentInputUpdate };
