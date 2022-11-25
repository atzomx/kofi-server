import { Repository } from "@core/domain";
import Media from "./media.entity";
import MediaModel from "./media.model";

class NediaRepository extends Repository<Media> {
  constructor() {
    super(MediaModel);
  }
}

export default NediaRepository;