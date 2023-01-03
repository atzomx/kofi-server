import { IPagination } from "@core/domain/interfaces";
import { MediaRepository } from "..";
import Media from "../domain/media.entity";
import { MediaNotFoundError } from "../domain/media.errors";
import { MediaPaginationArgs } from "../infrastructure/media.args";
import { MediaInputCreate } from "../infrastructure/media.input";
import mediaUtils from "./media.utils";


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

  async paginate({
    page,
    limit,
    search,
    endDate,
    startDate,
  }: MediaPaginationArgs): Promise<IPagination<Media>>{
    const searchQuery = mediaUtils.searchingQuery({
      search,
      endDate,
      startDate,
    });

    const paginator = this.repository.paginate(searchQuery, { limit, page});

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info:{
        total,
        page,
        pages,
      },
    };
  }

  async create(media: MediaInputCreate): Promise<Media> {
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