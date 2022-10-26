import { IPagination } from "@core/domain/interfaces";
import Verification from "../domain/verification.entity";
import {
  VerificationAlreadyExistsError,
  VerificationNotFoundError,
} from "../domain/verification.errors";
import VerificationRepository from "../domain/verification.repository";
import { VerificationPaginationArgs } from "../infrastructure/verification.args";
import {
  VerificationInputUpdate,
  VerificationInputCreate,
} from "../infrastructure/verification.inputs";
import VerificationUtils from "./verification.utils";

class VerificationController {
  private repository: VerificationRepository;

  constructor() {
    this.repository = new VerificationRepository();
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  async paginate({
    page,
    limit,
    search,
    status,
    pose,
    createdAt,
  }: VerificationPaginationArgs): Promise<IPagination<Verification>> {
    const searchQuery = VerificationUtils.searchingQuery({
      search,
      status,
      pose,
      createdAt,
    });

    const paginator = this.repository.paginate(searchQuery, { limit, page });

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async create(verification: VerificationInputCreate): Promise<Verification> {
    const query = {
      $or: [{ userId: verification.userId }],
    };
    const existingVerification = await this.repository.findOne(query);
    if (existingVerification)
      throw new VerificationAlreadyExistsError(
        existingVerification,
        verification,
      );

    const result = await this.repository.create(verification);
    return result;
  }

  async update(
    id: string,
    verification: VerificationInputUpdate,
  ): Promise<Verification> {
    const currentVerification = await this.repository.findById(id);
    if (!currentVerification) throw new VerificationNotFoundError();
    const updatedVerification = await this.repository.findByIdAndUpdate(
      id,
      verification,
    );
    return updatedVerification;
  }
}

export default VerificationController;
