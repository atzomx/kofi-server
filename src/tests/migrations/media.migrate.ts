import { MediaRepository } from "@entities/media";
import MediaFaker from "../fakers/media/media.faker";

const TOTAL_MEDIA = 20;

const up = async () => {
  const mediaRepository = new MediaRepository();
  const newMedias = Array.from({ length: TOTAL_MEDIA }).map(MediaFaker.get);

  const mediaCreated = await mediaRepository.insertMany(newMedias);
  const cleanMedias = mediaCreated.map((media) => media._doc);
  return cleanMedias;
};

const down = async () => {
  const mediaRepository = new MediaRepository();
  await mediaRepository.deleteMany();
};

export default { up, down };
