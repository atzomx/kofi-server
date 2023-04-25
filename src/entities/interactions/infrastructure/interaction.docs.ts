import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { AdvancedOptions } from "type-graphql/dist/decorators/types";
const NAMES = NamerUtils.get("interaction");

const InteractionQueryDocs: AdvancedOptions = {
  description: "Returns one Interaction by id",
  name: NAMES.find,
};

const InteractionPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of Interaction by user and type.",
  name: NAMES.paginate,
};

const InteractionCreateResponseDocs: AdvancedOptions = {
  description: "Register a new Interaction.",
  name: NAMES.create,
};

const InteractionMutationDocs: AdvancedOptions = {
  description: "Update an existing Interaction by id.",
  name: NAMES.update,
};

export const InteractionDocs = {
  InteractionQueryDocs,
  InteractionPaginateResponseDocs,
  InteractionCreateResponseDocs,
  InteractionMutationDocs,
};
