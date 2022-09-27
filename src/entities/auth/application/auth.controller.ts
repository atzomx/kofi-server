import { Password } from "@core/infrastructure/utils";
import { UserRepository } from "@entities/users";
import { InvalidCredentialsError } from "../domain/auth.errors";
import AuthUtils from "./auth.utils";

class AuthController {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async getToken(userName: string, password: string): Promise<string> {
    const user = await this.repository.findOne({
      $or: [{ userName }, { email: userName }],
    });
    if (!user) throw new InvalidCredentialsError();
    const isValid = Password.compare(user.password, password);

    if (!isValid) throw new InvalidCredentialsError();
    const token = AuthUtils.getToken(`${user._id}`);
    return token;
  }
}

export default AuthController;
