/* eslint-disable no-underscore-dangle */
import { Password } from "@core/infrastructure/utils";
import { UserRepository } from "@entities/users";
import { IUserRole } from "@entities/users/domain/user.enums";
import UserFaker from "../fakers/user/user.faker";

const TOTAL_USERS = 20;

const up = async () => {
  const userRepository = new UserRepository();
  const newUsers = Array.from({ length: TOTAL_USERS })
    .map(() => UserFaker.get(IUserRole.LOVER))
    .concat([
      UserFaker.get(IUserRole.ADMIN),
      UserFaker.get(IUserRole.MODERATOR),
    ]);

  const encryptedUsers = newUsers.map((user) => ({
    ...user,
    password: Password.encrypt(user.password),
  }));

  const usersCreated = await userRepository.insertMany(encryptedUsers);
  const cleanUsers = usersCreated.map((user) => user._doc);
  return cleanUsers;
};

const down = async () => {
  const userRepository = new UserRepository();
  await userRepository.deleteMany();
};

export default { up, down };
