/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { Interaction } from "@entities/interactions";
import { NotificationRepository } from "@entities/notifications";
import { User } from "@entities/users";
import NotificationsFaker from "../fakers/notifications/notifications.faker";

const TOTAL_MESSAGES = 20;

const up = async (users: User[], interactions: Interaction[]) => {
  const notificationsRepository = new NotificationRepository();
  const newNotifications = Array.from({ length: TOTAL_MESSAGES }).map(() => {
    const owner = getOneFromArray(users);
    const from = getOneFromArray(users);
    const interaction = getOneFromArray(interactions);
    return NotificationsFaker.get(
      owner._id.toString(),
      from._id.toString(),
      interaction._id.toString(),
    );
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
