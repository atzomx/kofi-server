import { AdvancedOptions } from "type-graphql/dist/decorators/types";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
const NAMES = NamerUtils.get("media");

const MediaQueryDocs: AdvancedOptions = {
  description: "Returns one media by id",
  name: NAMES.find,
};

const MediaPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of media.",
  name: NAMES.paginate,
};

const MediaMutationDocs: AdvancedOptions = {
  description: "Register a new media.",
  name: NAMES.create,
};

const MediaDeleteMutationDocs: AdvancedOptions = {
  description: "Delete media file.",
  name: NAMES.delete,
};

export const MediaDocs = {
  MediaQueryDocs,
  MediaPaginateResponseDocs,
  MediaMutationDocs,
  MediaDeleteMutationDocs,
};
