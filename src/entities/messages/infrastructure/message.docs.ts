import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { AdvancedOptions } from "type-graphql/dist/decorators/types";
const NAMES = NamerUtils.get("message");

const MessagePaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of message by chat.",
  name: NAMES.paginate,
};

const MessageCreateMutationDocs: AdvancedOptions = {
  description: "Create a new message.",
  name: NAMES.create,
};

export const MessageDocs = {
  MessagePaginateResponseDocs,
  MessageCreateMutationDocs,
};
