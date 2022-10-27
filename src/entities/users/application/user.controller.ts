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
    gender,
  }: UserPaginationArgs): Promise<IPagination<User>> {
    const searchQuery = UserUtils.searchingQuery({
      search,
      status,
      endDate,
      startDate,
      gender,
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
        { email: user.email },
        { curp: user.curp },
        { userName: user.userName },
      ],
    };
    const existingUser = await this.repository.findOne(query);
    if (existingUser) throw new UserAlreadyExistsError(existingUser, user);

    const sanitized = UserUtils.sanitize({
      firstName: user.firstName,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
      curp: user.curp,
    });

    const password = Password.encrypt(user.password);
    const newUser = { ...user, ...sanitized };
    const result = await this.repository.create({ ...newUser, password });
    return result;
  }

  async update(id: string, user: UserInputUpdate): Promise<User> {
    const currentUser = await this.findById(id);

    const sanitized = UserUtils.sanitize({
      firstName: user.firstName ?? currentUser.firstName,
      lastName: user.lastName ?? currentUser.lastName,
      secondLastName: user.secondLastName ?? currentUser.secondLastName,
      curp: user.curp ?? currentUser.curp,
    });
    const dataToUpdate = { ...user, ...sanitized };
    const updatedUser = await this.repository.findByIdAndUpdate(
      id,
      dataToUpdate,
    );
    return updatedUser;
  }
}

export default UserController;
