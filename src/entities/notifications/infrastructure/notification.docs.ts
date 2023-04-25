import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { AdvancedOptions } from "type-graphql/dist/decorators/types";
const NAMES = NamerUtils.get("notification");

const NotificationPaginateResponseDocs: AdvancedOptions = {
  description: "Returns an array of Notification by user.",
  name: NAMES.paginate,
};

export const NotificationDocs = {
  NotificationPaginateResponseDocs,
};
