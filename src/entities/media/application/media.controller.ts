import { IPagination } from "@core/domain/interfaces";
import mediaUtils from "./media.utils";
import { MediaRepository } from "..";
import Media from "../domain/media.entity";
import { MediaNotFoundError } from "../domain/media.errors";
import { MediaPaginationArgs } from "../infrastructure/media.args";
import { MediaCreateInput } from "../infrastructure/media.input";

class MediaController {
  private repository: MediaRepository;

  constructor() {
    this.repository = new MediaRepository();
  }

  async findById(id: string) {
    const currentMedia = await this.repository.findById(id);
    if (!currentMedia) throw new MediaNotFoundError();
    return currentMedia;
  }

  paginate({
    page,
    limit,
    search,
    endDate,
    startDate,
  }: MediaPaginationArgs): Promise<IPagination<Media>> {
    const searchQuery = mediaUtils.searchingQuery({
      search,
      endDate,
      startDate,
    });

    return this.repository.paginate(searchQuery, { limit, page });
  }

  async create(media: MediaCreateInput): Promise<Media> {
    const newMedia = { ...media };
    const result = await this.repository.create({ ...newMedia });
    return result;
  }

  async delete(id: string): Promise<Media> {
    const result = await this.repository.findByIdAndDelete(id);
    return result;
  }
}

export default MediaController;
