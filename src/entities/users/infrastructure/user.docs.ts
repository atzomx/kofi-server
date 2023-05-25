import { AdvancedOptions } from "type-graphql/dist/decorators/types";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
const NAMES = NamerUtils.get("user");

const UserQueryDocs: AdvancedOptions = {
  description: "Returns one user by id",
  name: NAMES.find,
};

const UserMeQueryDocs: AdvancedOptions = {
  description: "Returns one user by token",
  name: NAMES.me,
};

const UserPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of users.",
  name: NAMES.paginate,
};

const UserPaginateResponseQueueDocs: AdvancedOptions = {
  description: "Returns an array of available users.",
  name: "userQueue",
};

const UserMutationDocs: AdvancedOptions = {
  description: "Register a new user.",
  name: NAMES.create,
};

const UserUpdateMutationDocs: AdvancedOptions = {
  description: "Update an existing user by id.",
  name: NAMES.update,
};

const UserUpdateMeMutationDocs: AdvancedOptions = {
  description: "Update current user by token.",
  name: `${NAMES.update}Me`,
};

const UserMediaMutationDocs: AdvancedOptions = {
  description: "Create user media",
  name: "userMediaCreate",
};

const UserMediaDeleteMutationDocs: AdvancedOptions = {
  description: "Delete one user media by id",
  name: "userMediaDelete",
};

const UserMediaAltereMutationDocs: AdvancedOptions = {
  description: "Altered order user media",
  name: "userMediaOrder",
};

export const UserDocs = {
  UserQueryDocs,
  UserMeQueryDocs,
  UserPaginateResponseDocs,
  UserPaginateResponseQueueDocs,
  UserMutationDocs,
  UserUpdateMutationDocs,
  UserUpdateMeMutationDocs,
  UserMediaMutationDocs,
  UserMediaDeleteMutationDocs,
  UserMediaAltereMutationDocs,
};
