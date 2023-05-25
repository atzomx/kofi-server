import { AdvancedOptions } from "type-graphql/dist/decorators/types";
import namerUtils from "@core/infrastructure/utils/namer.utils";
const NAMES = namerUtils.get("chat");

const ChatPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of chats.",
  name: NAMES.paginate,
};

export const ChatDocs = {
  ChatPaginateResponseDocs,
};
