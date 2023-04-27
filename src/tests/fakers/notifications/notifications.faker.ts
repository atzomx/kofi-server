import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Notification } from "@entities/notifications";
import {
  INotificationStatus,
  INotificationType,
} from "@entities/notifications/domain/notification.enum";
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

class NotificationFaker {
  static get(owner: string, from: string, interaction: string): Notification {
    return {
      from: new Types.ObjectId(from),
      status: getEnumRandom(INotificationStatus),
      type: getEnumRandom(INotificationType),
      message: faker.random.word(),
      owner: new Types.ObjectId(owner),
      idReference: interaction,
    };
  }
}

export default NotificationFaker;
