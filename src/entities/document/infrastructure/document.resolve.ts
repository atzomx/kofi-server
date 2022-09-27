import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Document from "../domain/document.entity";
import DocumentController from "../application/document.controller";
import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { DocumentInputCreate, DocumentInputUpdate } from "./document.inputs";
import NamerUtils from "@core/infrastructure/utils/namer.utils";

const NAMES = NamerUtils.get("document");

@Resolver(Document)
class DocumentResolver {
  private controller: DocumentController;

  constructor() {
    this.controller = new DocumentController();
  }

  @Query(() => Document, {
    description: "Return one Document.",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Document> {
    const document = await this.controller.findById(id);
    return document;
  }

  @Mutation(() => Document, {
    description: "Register a new document.",
    name: NAMES.create,
  })
  @ValidateArgs(DocumentInputCreate, "data")
  async create(@Arg("data") document: DocumentInputCreate) {
    const result = await this.controller.create(document);
    return result;
  }

  @Mutation(() => Document, {
    description: "Update an existing document.",
    name: NAMES.update,
  })
  @ValidateIdentifier(DocumentInputUpdate, "id")
  @ValidateArgs(DocumentInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") document: DocumentInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), document);
    return result;
  }
}

export default DocumentResolver;
