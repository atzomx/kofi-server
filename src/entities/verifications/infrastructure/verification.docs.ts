import { AdvancedOptions } from "type-graphql/dist/decorators/types";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
const NAMES = NamerUtils.get("verification");

const VerificationQueryDocs: AdvancedOptions = {
  description: "Returns one Verification by id",
  name: NAMES.find,
};

const VerificationMeQueryDocs: AdvancedOptions = {
  description: "Returns one Verification by id in token",
  name: NAMES.me,
};

const VerificationPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of Verifications.",
  name: NAMES.paginate,
};

const VerificationMutationDocs: AdvancedOptions = {
  description: "Register a new Verification.",
  name: NAMES.create,
};

const VerificationUpdateMutationDocs: AdvancedOptions = {
  description: "Update an existing Verification by id.",
  name: NAMES.update,
};

export const VerificationDocs = {
  VerificationQueryDocs,
  VerificationMeQueryDocs,
  VerificationPaginateResponseDocs,
  VerificationMutationDocs,
  VerificationUpdateMutationDocs,
};
