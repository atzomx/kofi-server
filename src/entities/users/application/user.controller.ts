import { IPagination } from "@core/domain/interfaces";
import { Password, Sanitize } from "@core/infrastructure/utils";
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
    const currentUser = await this.repository.findById(id);
    if (!currentUser) throw new UserNotFoundError();
    return currentUser;
  }

  async paginate({
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

  async create(user: UserInputCreate): Promise<User> {
    const query = {
      $or: [
        { userName: user.userName },
      ],
    };
    const existingUser = await this.repository.findOne(query);
    if (existingUser) throw new UserAlreadyExistsError(existingUser, user);
    
    user.name = Sanitize.clean(user.name);
    
    const password = Password.encrypt(user.password);
    const newUser = { ...user };
    const result = await this.repository.create({ ...newUser, password });
    return result;
  }

  async update(id: string, user: UserInputUpdate): Promise<User> {
    const currentUser = await this.findById(id);

    user.name = Sanitize.clean(user.name ?? currentUser.name);

    const dataToUpdate = { ...user };
    const updatedUser = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedUser;
  }
}

export default UserController;
