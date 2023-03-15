import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Media, MediaCreateInput } from "@entities/media";
import { Types } from "mongoose";
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
import {
  UserCreateInput,
  UserMediaOrderInput,
  UserUpdateInput,
} from "./user.inputs";
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
  @ValidateArgs(UserCreateInput, "data")
  async create(@Arg("data") user: UserCreateInput) {
    const result = await this.controller.create(user);
    return result;
  }

  @Mutation(() => User, {
    description: "Update an existing user by id.",
    name: NAMES.update,
  })
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  @ValidateArgs(UserUpdateInput, "data")
  async update(@Arg("id") id: string, @Arg("data") user: UserUpdateInput) {
    const result = await this.controller.update(id.toString(), user);
    return result;
  }

  @Mutation(() => User, {
    description: "Update current user by token.",
    name: `${NAMES.update}Me`,
  })
  @Authorized()
  @ValidateArgs(UserUpdateInput, "data")
  async updateMe(@Ctx() ctx: IContext, @Arg("data") user: UserUpdateInput) {
    const result = await this.controller.update(ctx.payload.id, user);
    return result;
  }

  @Mutation(() => [Media], {
    description: "Create user media",
    name: "userMediaCreate",
  })
  @Authorized()
  @ValidateArgs(MediaCreateInput, "data")
  async userMediaCreate(
    @Ctx() ctx: IContext,
    @Arg("data") media: MediaCreateInput,
  ) {
    const result = await this.controller.mediaCreate(ctx.payload.id, media);
    return result;
  }

  @Mutation(() => [Media], {
    description: "Delete one user media by id",
    name: "userMediaDelete",
  })
  @Authorized()
  async userMediaDelete(
    @Ctx() ctx: IContext,
    @Arg("id") media: Types.ObjectId,
  ) {
    const result = await this.controller.mediaDelete(
      ctx.payload.id,
      media.toString(),
    );
    return result;
  }

  @Mutation(() => [Media], {
    description: "Altered order user media",
    name: "userMediaOrder",
  })
  @Authorized()
  @ValidateArgs(UserMediaOrderInput, "data")
  async userMediaOrder(
    @Ctx() ctx: IContext,
    @Arg("data") data: UserMediaOrderInput,
  ) {
    const result = await this.controller.mediaOrder(
      ctx.payload.id,
      data.medias,
    );
    return result;
  }
}

export default UserResolver;
