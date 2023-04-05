import { IPagination } from "@core/domain/interfaces";
import { Password } from "@core/infrastructure/utils";
import { Media, MediaController, MediaCreateInput } from "@entities/media";
import { Types } from "mongoose";
import User from "../domain/user.entity";
import { IUserRole } from "../domain/user.enums";
import {
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../domain/user.errors";
import UserRepository from "../domain/user.repository";
import { UserPaginationArgs } from "../infrastructure/user.args";
import {
  UserCreateInput,
  UserUpdateInput,
} from "../infrastructure/user.inputs";
import UserQueueUseCase from "./use-cases/user-queue.use-case";
import UserUtils from "./user.utils";

class UserController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findById(id: string, userCtx?: User) {
    const select = userCtx?.role === IUserRole.LOVER ? "-preferences" : "";
    const currentUser = await this.repository
      .findById(id)
      .populate(["information.medias"])
      .select(select)
      .lean();

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
      populate: { path: "information.medias" },
    });
  }

  userQueue(
    { page, limit }: UserPaginationArgs,
    user: User,
  ): Promise<IPagination<User & { distance: number }>> {
    const userQueueUseCase = new UserQueueUseCase();
    const pagination = userQueueUseCase.execute(
      { limit, page },
      user,
      this.repository,
    );
    return pagination;
  }

  async create(user: UserCreateInput): Promise<User> {
    const query = { email: user.email };
    const existingUser = await this.repository.findOne(query).lean();
    if (existingUser) throw new UserAlreadyExistsError();

    const password = Password.encrypt(user.password);
    const newUser = { ...user };
    const result = await this.repository.create({ ...newUser, password });
    return result;
  }

  async update(id: string, user: UserUpdateInput): Promise<User> {
    await this.findById(id);
    const updatedUser = await this.repository
      .findByIdAndUpdate(id, user)
      .populate(["information.medias"])
      .lean();
    return updatedUser;
  }

  async mediaCreate(userId: string, media: MediaCreateInput): Promise<Media[]> {
    const mediaController = new MediaController();
    const mediaCreated = await mediaController.create(media);
    const mediaId = mediaCreated._id.toString();

    const user = await this.repository
      .findByIdAndUpdate(userId, { $push: { "information.medias": mediaId } })
      .populate("information.medias")
      .select("information.medias")
      .lean();

    return user.information.medias as Media[];
  }

  async mediaDelete(userId: string, mediaId: string): Promise<Media[]> {
    const mediaController = new MediaController();
    await mediaController.delete(mediaId);

    const user = await this.repository
      .findByIdAndUpdate(userId, { $pull: { "information.medias": mediaId } })
      .populate("information.medias")
      .select("information.medias")
      .lean();

    return user.information.medias as Media[];
  }

  async mediaOrder(userId: string, medias: Types.ObjectId[]): Promise<Media[]> {
    const user = await this.repository
      .findByIdAndUpdate(userId, { "information.medias": medias })
      .populate("information.medias")
      .select("information.medias")
      .lean();

    return user.information.medias as Media[];
  }
}

export default UserController;
