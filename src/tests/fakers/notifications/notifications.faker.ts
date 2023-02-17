import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Notification } from "@entities/notifications";
import {
  INotificationStatus,
  INotificationType,
} from "@entities/notifications/domain/notification.enum";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

class NotificationFaker {
  static get(user: string): Notification {
    return {
      from: faker.name.firstName(),
      leyend: faker.random.word(),
      status: getEnumRandom(INotificationStatus),
      type: getEnumRandom(INotificationType),
      message: faker.random.word(),
      owner: new Types.ObjectId(user),
      idReference: user,
    };
  }
}

export default NotificationFaker;
