import { ValidateArgs } from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { MediaController } from "..";
import Media from "../domain/media.entity";
import { MediaPaginationArgs } from "./media.args";
import { MediaInputCreate } from "./media.input";
import { MediaPaginateResponse } from "./media.response";

const NAMES = NamerUtils.get("media");

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
  async findById(@Arg("id") id: string): Promise<Media> {
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

  @Mutation(() => Media, {
    description: "Delete media file.",
    name: NAMES.delete,
  })
  @Authorized()
  async delete(@Arg("id") id: string) {
    const result = await this.controller.delete(id.toString());
    return result;
  }
}

export default MediaResolver;
