import { Repository } from "@core/domain";
import Document from "./document.entity";
import DocumentModel from "./document.model";

class DocumentRepository extends Repository<Document> {
  constructor() {
    super(DocumentModel);
  }
}

export default DocumentRepository;
