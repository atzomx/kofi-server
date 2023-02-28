import { IContext } from "@core/domain/interfaces";
import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import MatchController from "../application/match.controller";
import Match from "../domain/match.entity";
import { MatchPaginationArgs } from "./match.args";
import { MatchInputUpdate } from "./match.inputs";
import { MatchPaginateResponse } from "./match.response";

const NAMES = NamerUtils.get("match");

@Resolver(Match)
class MatchResolver {
  private controller: MatchController;

  constructor() {
    this.controller = new MatchController();
  }

  @Query(() => Match, {
    description: "Returns one Match by id",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Match> {
    const match = await this.controller.findById(id);
    return match;
  }

  @Query(() => MatchPaginateResponse, {
    description: "Returns an array of Match by user and status.",
    name: NAMES.paginate,
  })
  @Authorized()
  async paginate(@Args() paginate: MatchPaginationArgs, @Ctx() ctx: IContext) {
    const user = ctx.payload.id;
    const results = await this.controller.paginate({ user, ...paginate });
    return results;
  }

  @Mutation(() => Match, {
    description: "Update an existing Match by id.",
    name: NAMES.update,
  })
  @Authorized()
  @ValidateArgs(MatchInputUpdate, "data")
  async update(@Arg("id") id: string, @Arg("data") match: MatchInputUpdate) {
    const result = await this.controller.update(id.toString(), match);
    return result;
  }
}

export default MatchResolver;
