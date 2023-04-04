import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
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
import { UserDocs } from "./user.docs";
import {
  UserCreateInput,
  UserMediaOrderInput,
  UserUpdateInput,
} from "./user.inputs";
import { UserFindById } from "./user.outputs";
import {
  UserPaginateResponse,
  UserPaginateResponseQueue,
} from "./user.response";

@Resolver(User)
class UserResolver {
  constructor(private controller: UserController) {
    this.controller = new UserController();
  }

  @Query(() => User, UserDocs.UserQueryDocs)
  @Authorized()
  async findById(@Arg("id") id: string) {
    const user = await this.controller.findById(id);
    return user as UserFindById;
  }

  @Query(() => User, UserDocs.UserMeQueryDocs)
  @Authorized()
  async userMe(@Ctx() ctx: IContext) {
    const userId = ctx.payload.id;
    const user = await this.controller.findById(userId);
    return user;
  }

  @Query(() => UserPaginateResponse, UserDocs.UserPaginateResponseDocs)
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  async paginate(@Args() paginate: UserPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Query(
    () => UserPaginateResponseQueue,
    UserDocs.UserPaginateResponseQueueDocs,
  )
  @Authorized()
  async userQueue(@Ctx() ctx: IContext, @Args() paginate: UserPaginationArgs) {
    const { user } = ctx.payload;
    const results = await this.controller.userQueue(paginate, user);
    return results;
  }

  @Mutation(() => User, UserDocs.UserMutationDocs)
  @ValidateArgs(UserCreateInput, "data")
  async create(@Arg("data") user: UserCreateInput) {
    const result = await this.controller.create(user);
    return result;
  }

  @Mutation(() => User, UserDocs.UserUpdateMutationDocs)
  @Authorized(IUserRole.ADMIN, IUserRole.MODERATOR)
  @ValidateArgs(UserUpdateInput, "data")
  async update(@Arg("id") id: string, @Arg("data") user: UserUpdateInput) {
    const result = await this.controller.update(id.toString(), user);
    return result;
  }

  @Mutation(() => User, UserDocs.UserUpdateMeMutationDocs)
  @Authorized()
  @ValidateArgs(UserUpdateInput, "data")
  async updateMe(@Ctx() ctx: IContext, @Arg("data") user: UserUpdateInput) {
    const result = await this.controller.update(ctx.payload.id, user);
    return result;
  }

  @Mutation(() => [Media], UserDocs.UserMediaMutationDocs)
  @Authorized()
  @ValidateArgs(MediaCreateInput, "data")
  async userMediaCreate(
    @Ctx() ctx: IContext,
    @Arg("data") media: MediaCreateInput,
  ) {
    const result = await this.controller.mediaCreate(ctx.payload.id, media);
    return result;
  }

  @Mutation(() => [Media], UserDocs.UserMediaDeleteMutationDocs)
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

  @Mutation(() => [Media], UserDocs.UserMediaAltereMutationDocs)
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
