import { Repository } from "@core/domain";
import User from "./user.entity";
import UserModel from "./user.model";

class UserRepository extends Repository<User> {
  constructor() {
    super(UserModel);
  }
}

export default UserRepository;
