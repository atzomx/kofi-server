import { IPagination } from "@core/domain/interfaces";
import { UserController } from "@entities/users";
import VerificationUtils from "./verification.utils";
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

class VerificationController {
  private repository: VerificationRepository;
  private userController: UserController;

  constructor() {
    this.repository = new VerificationRepository();
    this.userController = new UserController();
  }

  async findByUserId(id: string) {
    const query = { userId: id };
    const userVerification = await this.repository.findOne(query);
    return userVerification;
  }

  async findById(id: string) {
    const currentVerification = await this.repository.findById(id);
    if (!currentVerification) throw new VerificationNotFoundError();
    return currentVerification;
  }

  paginate({
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

    return this.repository.paginate(searchQuery, { limit, page });
  }

  async create(verification: VerificationInputCreate): Promise<Verification> {
    await this.userController.findById(verification.userId.toString());
    const query = {
      $or: [{ userId: verification.userId }],
    };
    const existingVerification = await this.repository.findOne(query);
    if (existingVerification) throw new VerificationAlreadyExistsError();

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
