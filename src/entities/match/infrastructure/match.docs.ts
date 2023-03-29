import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { AdvancedOptions } from "type-graphql/dist/decorators/types";
const NAMES = NamerUtils.get("match");

const MatchQueryDocs: AdvancedOptions = {
  description: "Returns one Match by id",
  name: NAMES.find,
};

const MatchPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of Match by user and status.",
  name: NAMES.paginate,
};

const MatchMutationDocs: AdvancedOptions = {
  description: "Update an existing Match by id.",
  name: NAMES.update,
};

export const MatchDocs = {
  MatchQueryDocs,
  MatchPaginateResponseDocs,
  MatchMutationDocs,
};
