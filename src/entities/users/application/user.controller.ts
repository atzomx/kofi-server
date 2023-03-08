import { IPagination } from "@core/domain/interfaces";
import { Password } from "@core/infrastructure/utils";
import User from "../domain/user.entity";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../domain/user.errors";
import UserRepository from "../domain/user.repository";
import { UserPaginationArgs } from "../infrastructure/user.args";
import {
  UserInputCreate,
  UserInputUpdate,
} from "../infrastructure/user.inputs";
import UserUtils from "./user.utils";

class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findById(id: string) {
    const currentUser = await this.repository
      .findById(id)
      .populate(["information.medias"]);
    if (!currentUser) throw new UserNotFoundError();
    return currentUser;
  }

  paginate({
    page,
    limit,
    search,
    status,
    endDate,
    startDate,
  }: UserPaginationArgs): Promise<IPagination<User>> {
    const searchQuery = UserUtils.searchingQuery({
      search,
      status,
      endDate,
      startDate,
    });
    return this.repository.paginate(searchQuery, {
      limit,
      page,
      sort: { updatedAt: -1 },
      populate: "information.medias",
    });
  }

  async userQueue(
    { page, limit }: UserPaginationArgs,
    user: User,
  ): Promise<IPagination<User>> {
    return this.repository.userQueue({ limit, page }, user);
  }

  async create(user: UserInputCreate): Promise<User> {
    const query = { email: user.email };
    const existingUser = await this.repository.findOne(query);
    if (existingUser) throw new UserAlreadyExistsError();

    const password = Password.encrypt(user.password);
    const newUser = { ...user };
    const result = await this.repository.create({ ...newUser, password });
    return result;
  }

  async update(id: string, user: UserInputUpdate): Promise<User> {
    await this.findById(id);
    const updatedUser = await this.repository
      .findByIdAndUpdate(id, user)
      .populate(["information.medias"]);
    return updatedUser;
  }
}

export default UserController;
