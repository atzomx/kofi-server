import { IPagination } from "@core/domain/interfaces";
import { UserController } from "@entities/users";
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
  private userController: UserController;

  constructor() {
    this.repository = new VerificationRepository();
    this.userController = new UserController();
  }

  async findById(id: string) {
    const currentVerification = await this.repository.findById(id);
    if (!currentVerification) throw new VerificationNotFoundError();
    return currentVerification;
  }

  async paginate({
    page,
    limit,
    userId,
    status,
    pose,
    createdAt,
  }: VerificationPaginationArgs): Promise<IPagination<Verification>> {
    const searchQuery = VerificationUtils.searchingQuery({
      userId,
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
    await this.userController.findById(verification.userId.toString());
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
    const updatedVerification = await this.repository.findByIdAndUpdate(
      id,
      verification,
    );
    if (!updatedVerification) throw new VerificationNotFoundError();
    return updatedVerification;
  }
}

export default VerificationController;
