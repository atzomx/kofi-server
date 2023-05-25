import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import { VerificationPaginationArgs } from "./verification.args";
import { VerificationDocs } from "./verification.docs";
import {
  VerificationInputCreate,
  VerificationInputUpdate,
} from "./verification.inputs";
import { VerificationPaginateResponse } from "./verification.response";
import VerificationController from "../application/verification.controller";
import Verification from "../domain/verification.entity";

@Resolver(Verification)
class VerificationResolver {
  private controller: VerificationController;

  constructor() {
    this.controller = new VerificationController();
  }

  @Query(() => Verification, VerificationDocs.VerificationQueryDocs)
  @Authorized()
  async findById(@Arg("id") id: string): Promise<Verification> {
    const verification = await this.controller.findById(id);
    return verification;
  }

  @Query(() => Verification, VerificationDocs.VerificationMeQueryDocs)
  @Authorized()
  async verificationMe(@Ctx() ctx: IContext) {
    const userId = ctx.payload.id;
    const user = await this.controller.findByUserId(userId);
    return user;
  }

  @Query(
    () => VerificationPaginateResponse,
    VerificationDocs.VerificationPaginateResponseDocs,
  )
  @Authorized()
  async paginate(@Args() paginate: VerificationPaginationArgs) {
    const results = await this.controller.paginate(paginate);
    return results;
  }

  @Mutation(() => Verification, VerificationDocs.VerificationMutationDocs)
  @Authorized()
  @ValidateArgs(VerificationInputCreate, "data")
  async create(@Arg("data") verification: VerificationInputCreate) {
    const result = await this.controller.create(verification);
    return result;
  }

  @Mutation(() => Verification, VerificationDocs.VerificationUpdateMutationDocs)
  @Authorized()
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
