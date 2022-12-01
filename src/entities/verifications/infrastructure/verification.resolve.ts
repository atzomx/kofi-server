import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import AuthMiddleware from "@entities/auth/infrastructure/auth.middleware";
import {
  Arg,
  Args,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import VerificationController from "../application/verification.controller";
import Verification from "../domain/verification.entity";
import { VerificationPaginationArgs } from "./verification.args";
import {
  VerificationInputCreate,
  VerificationInputUpdate,
} from "./verification.inputs";
import { VerificationPaginateResponse } from "./verification.response";

const NAMES = NamerUtils.get("verification");

@Resolver(Verification)
class VerificationResolver {
  private controller: VerificationController;

  constructor() {
    this.controller = new VerificationController();
  }

  @Query(() => Verification, {
    description: "Returns one Verification by id",
    name: NAMES.find,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async findById(@Arg("id") id: string): Promise<Verification> {
    const verification = await this.controller.findById(id);
    return verification;
  }

  @Query(() => VerificationPaginateResponse, {
    description: "Returns an array of Verifications.",
    name: NAMES.paginate,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  async paginate(@Args() paginate: VerificationPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => Verification, {
    description: "Register a new Verification.",
    name: NAMES.create,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(VerificationInputCreate, "data")
  async create(@Arg("data") verification: VerificationInputCreate) {
    const result = await this.controller.create(verification);
    return result;
  }

  @Mutation(() => Verification, {
    description: "Update an existing Verification by id.",
    name: NAMES.update,
  })
  @UseMiddleware(AuthMiddleware.IsAuth)
  @ValidateArgs(VerificationInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") verification: VerificationInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), verification);
    return result;
  }
}

export default VerificationResolver;
