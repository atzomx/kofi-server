import Document from "../domain/document.entity";
import {
  DocumentAlreadyExistError,
  DocumentNotFoundError,
} from "../domain/document.errors";
import DocumentRepository from "../domain/document.repository";
import {
  DocumentInputCreate,
  DocumentInputUpdate,
} from "../infrastructure/document.inputs";
import documentUtils from "./document.utils";

class DocumentController {
  private repository: DocumentRepository;

  constructor() {
    this.repository = new DocumentRepository();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async create(document: DocumentInputCreate): Promise<Document> {
    const query = {
      $and: [{ name: document.name }, { owner: document.owner }],
    };

    const existingDocument = await this.repository.findOne(query);
    if (existingDocument) throw new DocumentAlreadyExistError(document.name);

    const sanitized = documentUtils.sanitize({ ...document });

    const newDocument = { ...document, ...sanitized };
    const result = await this.repository.create({ ...newDocument });

    return result;
  }

  async update(id: string, document: DocumentInputUpdate): Promise<Document> {
    const currentDocument = await this.repository.findById(id);
    if (!currentDocument) throw new DocumentNotFoundError();

    const sanitized = documentUtils.sanitize({
      ...document,
      ...currentDocument,
    });

    const dataToUpdate = { ...document, ...sanitized };
    const updatedDocument = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );

    return updatedDocument;
  }
}

export default DocumentController;
