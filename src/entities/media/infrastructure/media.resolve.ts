import { ValidateArgs } from "@core/infrastructure/decorators";
import namerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { MediaController } from "..";
import Media from "../domain/media.entity";
import { MediaPaginationArgs } from "./media.args";
import { MediaInputCreate } from "./media.input";
import { MediaPaginateResponse } from "./media.response";

const NAMES = namerUtils.get("user");

@Resolver(Media)
class MediaResolver {
  private controller: MediaController;

  constructor() {
    this.controller = new MediaController();
  }

  @Query(() => Media, {
    description: "Returns one media by id",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Media>{
    const media = await this.controller.findById(id);
    return media;
  }

  @Query(() => MediaPaginateResponse, {
    description: "Returns an array of media.",
    name: NAMES.paginate,
  })
  async paginate(@Args() paginate: MediaPaginationArgs) {
    const result = await this.controller.paginate(paginate);
    return result;
  }

  @Mutation(() => Media, {
    description: "Register a new media.",
    name: NAMES.create,
  })
  @ValidateArgs(MediaInputCreate, "data")
  async create(@Arg("data") media: MediaInputCreate) {
    const result = await this.controller.create(media);
    return result;
  }
}

export default MediaResolver;