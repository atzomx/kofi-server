import { UserRepository } from "@entities/users";
import UserFaker from "../fakers/user.faker";

const TOTAL_USERS = 20;

const up = async () => {
  const userRepository = new UserRepository();
  const newUsers = Array(TOTAL_USERS).fill(null).map(UserFaker.get);
  const usersCreated = await userRepository.insertMany(newUsers);
  const ids = usersCreated.map(({ _id }) => _id.toString());
  return ids;
};

const down = async () => {
  const userRepository = new UserRepository();
  await userRepository.deleteMany();
};

export default { up, down };
