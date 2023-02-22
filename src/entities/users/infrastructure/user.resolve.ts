import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import AuthMiddleware from "@entities/auth/infrastructure/auth.middleware";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import UserController from "../application/user.controller";
import User from "../domain/user.entity";
import { UserPaginationArgs } from "./user.args";
import { UserInputCreate, UserInputUpdate } from "./user.inputs";
import { UserPaginateResponse } from "./user.response";

const NAMES = NamerUtils.get("user");

@Resolver(User)
class UserResolver {
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  @Query(() => User, {
    description: "Returns one user by id",
    name: NAMES.find,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async findById(@Arg("id") id: string): Promise<User> {
    const user = await this.controller.findById(id);
    return user;
  }

  @Query(() => User, {
    description: "Returns one user by token",
    name: NAMES.me,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async userMe(@Ctx() ctx: IContext) {
    const userId = ctx.payload.id;
    const user = await this.controller.findById(userId);
    return user;
  }

  @Query(() => UserPaginateResponse, {
    description: "Returns an array of users.",
    name: NAMES.paginate,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(@Args() paginate: UserPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => User, {
    description: "Register a new user.",
    name: NAMES.create,
  })
  @ValidateArgs(UserInputCreate, "data")
  async create(@Arg("data") user: UserInputCreate) {
    const result = await this.controller.create(user);
    return result;
  }

  @Mutation(() => User, {
    description: "Update an existing user by id.",
    name: NAMES.update,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(UserInputUpdate, "data")
  async update(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.update(id.toString(), user);
    return result;
  }
}

export default UserResolver;
