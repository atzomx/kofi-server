import { Arg, Mutation, Resolver } from "type-graphql";
import AuthController from "../application/auth.controller";
import { LoginDocs } from "./auth.docs";
import { LoginResponse } from "./auth.response";

@Resolver()
class AuthResolver {
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
  }

  @Mutation(() => LoginResponse, LoginDocs.LoginResponseDocs)
  async userLogin(
    @Arg("user") user: string,
    @Arg("password") password: string,
  ): Promise<LoginResponse> {
    const token = await this.controller.getToken(user, password);
    return { token };
  }
}

export default AuthResolver;
