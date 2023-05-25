import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { ValidateArgs } from "@core/infrastructure/decorators";
import { MediaPaginationArgs } from "./media.args";
import { MediaDocs } from "./media.docs";
import { MediaCreateInput } from "./media.input";
import { MediaPaginateResponse } from "./media.response";
import { MediaController } from "..";
import Media from "../domain/media.entity";

@Resolver(Media)
class MediaResolver {
  private controller: MediaController;

  constructor() {
    this.controller = new MediaController();
  }

  @Query(() => Media, MediaDocs.MediaQueryDocs)
  async findById(@Arg("id") id: string): Promise<Media> {
    const media = await this.controller.findById(id);
    return media;
  }

  @Query(() => MediaPaginateResponse, MediaDocs.MediaPaginateResponseDocs)
  async paginate(@Args() paginate: MediaPaginationArgs) {
    const result = await this.controller.paginate(paginate);
    return result;
  }

  @Mutation(() => Media, MediaDocs.MediaMutationDocs)
  @ValidateArgs(MediaCreateInput, "data")
  async create(@Arg("data") media: MediaCreateInput) {
    const result = await this.controller.create(media);
    return result;
  }

  @Mutation(() => Media, MediaDocs.MediaDeleteMutationDocs)
  @Authorized()
  async delete(@Arg("id") id: string) {
    const result = await this.controller.delete(id.toString());
    return result;
  }
}

export default MediaResolver;
