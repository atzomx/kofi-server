import { IPagination } from "@core/domain/interfaces";
import { Paginate } from "@core/infrastructure/utils";
import { InteractionRepository } from "@entities/interactions";
import User from "@entities/users/domain/user.entity";
import { IUserRole } from "@entities/users/domain/user.enums";
import UserRepository from "@entities/users/domain/user.repository";
import { UserPaginationArgs } from "@entities/users/infrastructure/user.args";
import UserUtils from "../user.utils";

const userQueue = async (
  { page, limit }: UserPaginationArgs,
  user: User,
  userRepository: UserRepository,
): Promise<IPagination<User & { distance: number }>> => {
  const interactionRepository = new InteractionRepository();
  const noInUsers = await interactionRepository.unavailableUsers(user);

  const searchQuery = {
    $and: [{ _id: { $nin: noInUsers } }, { role: IUserRole.LOVER }],
  };

  const maxDistance = 10000; // 100 km
  const minDistance = 1000; // 1 km

  const { coordinates } = user.information.location;
  const skip = Paginate.getSkip({ page, limit });

  const pointQuery = UserUtils.pointQuery({
    coordinates,
    maxDistance,
    minDistance,
  });

  const totalPromise = userRepository.instance.aggregate<{ total: number }>([
    pointQuery,
    { $match: searchQuery },
    { $count: "total" },
  ]);

  const resultsPromise = userRepository.instance.aggregate<
    User & { distance: number }
  >([pointQuery, { $match: searchQuery }, { $skip: skip }, { $limit: limit }]);

  const [[count], results] = await Promise.all([totalPromise, resultsPromise]);
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
};

export default userQueue;
