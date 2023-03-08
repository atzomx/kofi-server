import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import UserController from "../application/user.controller";
import User from "../domain/user.entity";
import { IUserRole } from "../domain/user.enums";
import { UserPaginationArgs } from "./user.args";
import { UserInputCreate, UserInputUpdate } from "./user.inputs";
import {
  UserPaginateResponse,
  UserPaginateResponseQueue,
} from "./user.response";

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
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  async findById(@Arg("id") id: string): Promise<User> {
    const user = await this.controller.findById(id);
    return user;
  }

  @Query(() => User, {
    description: "Returns one user by token",
    name: NAMES.me,
  })
  @Authorized()
  async userMe(@Ctx() ctx: IContext) {
    const userId = ctx.payload.id;
    const user = await this.controller.findById(userId);
    return user;
  }

  @Query(() => UserPaginateResponse, {
    description: "Returns an array of users.",
    name: NAMES.paginate,
  })
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  async paginate(@Args() paginate: UserPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Query(() => UserPaginateResponseQueue, {
    description: "Returns an array of available users.",
    name: "userQueue",
  })
  @Authorized()
  async userQueue(@Ctx() ctx: IContext, @Args() paginate: UserPaginationArgs) {
    const { user } = ctx.payload;
    const results = await this.controller.userQueue(paginate, user);
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
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  @ValidateArgs(UserInputUpdate, "data")
  async update(@Arg("id") id: string, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.update(id.toString(), user);
    return result;
  }

  @Mutation(() => User, {
    description: "Update current user by token.",
    name: `${NAMES.update}Me`,
  })
  @Authorized()
  @ValidateArgs(UserInputUpdate, "data")
  async updateMe(@Ctx() ctx: IContext, @Arg("data") user: UserInputUpdate) {
    const result = await this.controller.update(ctx.payload.id, user);
    return result;
  }
}

export default UserResolver;
