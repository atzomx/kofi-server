import { IPagination } from "@core/domain/interfaces";
import { Paginate } from "@core/infrastructure/utils";
import { InteractionRepository } from "@entities/interactions";
import User from "@entities/users/domain/user.entity";
import { IUserRole } from "@entities/users/domain/user.enums";
import UserRepository from "@entities/users/domain/user.repository";
import { UserPaginationArgs } from "@entities/users/infrastructure/user.args";
import UserUtils from "../user.utils";

type UserDistance = User & { distance: number };

const METERS_BY_KM = 1000;

class UserQueueUseCase {
  async execute(
    { page, limit }: UserPaginationArgs,
    user: User,
    repository: UserRepository,
  ): Promise<IPagination<User & { distance: number }>> {
    const interactionRepository = new InteractionRepository();
    const noInUsers = await interactionRepository.unavailableUsers(user);

    const searchQuery = {
      $and: [{ _id: { $nin: noInUsers } }, { role: IUserRole.LOVER }],
    };

    const maxDistance = user.preferences.distance.min * METERS_BY_KM;
    const minDistance = user.preferences.distance.max * METERS_BY_KM;

    const { coordinates } = user.information.location;
    const skip = Paginate.getSkip({ page, limit });

    const pointQuery = UserUtils.pointQuery({
      coordinates,
      maxDistance,
      minDistance,
      query: searchQuery,
    });

    const totalPromise = repository.instance.aggregate<{ total: number }>([
      pointQuery,
      { $count: "total" },
    ]);

    const resultsPromise = repository.instance.aggregate<UserDistance>([
      pointQuery,
      { $skip: skip },
      { $limit: limit },
    ]);

    const [[count], results] = await Promise.all([
      totalPromise,
      resultsPromise,
    ]);
    const { total = 0 } = count || {};
    const pages = Math.ceil(total / limit);

    return {
      info: {
        page,
        total,
        pages,
      },
      results,
    };
  }
}

export default UserQueueUseCase;
