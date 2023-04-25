/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { NotificationRepository } from "@entities/notifications";
import { User } from "@entities/users";
import NotificationsFaker from "../fakers/notifications/notifications.faker";

const TOTAL_MESSAGES = 20;

const up = async (users: User[]) => {
  const notificationsRepository = new NotificationRepository();
  const newNotifications = Array.from({ length: TOTAL_MESSAGES }).map(() => {
    const user = getOneFromArray(users);
    return NotificationsFaker.get(user._id.toString());
  });

  const notificationsCreated = await notificationsRepository.insertMany(
    newNotifications,
  );
  const cleanNotifications = notificationsCreated.map((chats) => chats._doc);
  return cleanNotifications;
};

const down = async () => {
  const notificationsRepository = new NotificationRepository();
  await notificationsRepository.deleteMany();
};

export default { up, down };
