import { Repository } from "@core/domain";
import { IPagination } from "@core/domain/interfaces";
import { Paginate } from "@core/infrastructure/utils";
import { InteractionRepository } from "@entities/interactions";
import { PipelineStage } from "mongoose";
import { UserPaginationArgs } from "../infrastructure/user.args";
import User from "./user.entity";
import { IUserRole } from "./user.enums";
import UserModel from "./user.model";

class UserRepository extends Repository<User> {
  constructor() {
    super(UserModel);
  }

  async userQueue(
    { page, limit }: UserPaginationArgs,
    user: User,
  ): Promise<IPagination<User & { distance: number }>> {
    const interactionRepository = new InteractionRepository();

    const searchQuery2 = { userFrom: user._id.toString() };
    const interactionOfThisUser = await interactionRepository
      .find(searchQuery2)
      .select("userTo");

    const noInUsers = [...interactionOfThisUser]
      .map(({ userTo }) => userTo)
      .concat([user._id]);

    const searchQuery = {
      $and: [{ _id: { $nin: noInUsers } }, { role: IUserRole.LOVER }],
    };

    const maxDistance = 10000; // 100 km
    const minDistance = 1000; // 1 km

    const { coordinates } = user.information.location;
    const skip = Paginate.getSkip({ page, limit });

    const pointQuery: PipelineStage.GeoNear = {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: coordinates,
        },
        distanceField: "distance",
        maxDistance: maxDistance,
        minDistance: minDistance,
        spherical: true,
        distanceMultiplier: 0.001,
        key: "information.location",
      },
    };

    const totalPromise = this.instance.aggregate<{ total: number }>([
      pointQuery,
      { $match: searchQuery },
      { $count: "total" },
    ]);

    const resultsPromise = this.instance.aggregate<User & { distance: number }>(
      [pointQuery, { $match: searchQuery }, { $skip: skip }, { $limit: limit }],
    );

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

export default UserRepository;
