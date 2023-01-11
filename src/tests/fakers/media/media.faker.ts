import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
// import { Media } from "@entities/media";
import Media from "@entities/media/domain/media.entity";
import { IMediaType } from "@entities/media/domain/media.enum";
import { faker } from "@faker-js/faker";

class MediaFaker {
  static get () {
    const complete: Media = {
      mediaType: getEnumRandom(IMediaType),
      mediaUrl: faker.image.imageUrl(),
    };
    
    return complete;
  }
}

export default MediaFaker;