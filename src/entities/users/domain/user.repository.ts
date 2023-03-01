import { Repository } from "@core/domain";
import { IPagination } from "@core/domain/interfaces";
import { InteractionRepository } from "@entities/interactions";
import { Types } from "mongoose";
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
    idUser: string,
  ): Promise<IPagination<User>> {
    const interactionRepository = new InteractionRepository();

    const searchQuery2 = { userFrom: idUser };
    const interactionOfThisUser = await interactionRepository
      .find(searchQuery2)
      .select("userTo");

    const searchQuery = {
      $and: [
        {
          _id: {
            $nin: [...interactionOfThisUser]
              .map(({ userTo }) => userTo)
              .concat([new Types.ObjectId(idUser)]),
          },
        },
        {
          role: IUserRole.LOVER,
        },
      ],
    };

    return this.paginate(searchQuery, { limit, page });
  }
}

export default UserRepository;
