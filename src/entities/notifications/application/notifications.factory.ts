import { Types } from "mongoose";
import Notification from "../domain/notification.entity";
import {
  INotificationStatus,
  INotificationType,
} from "../domain/notification.enum";
import NotificationRepository from "../domain/notification.repository";

type TNotificationBase = {
  message?: string;
  from?: Types.ObjectId;
  owner: Types.ObjectId;
  idReference?: string;
};

class BaseNotification extends Notification {
  constructor({ message, from, owner, idReference }: TNotificationBase) {
    super();
    this.message = message;
    this.from = from;
    this.owner = owner;
    this.status = INotificationStatus.unread;
    this.idReference = idReference;
  }
}

export class NotificationLike extends BaseNotification {
  constructor(base: TNotificationBase) {
    super(base);
    this.type = INotificationType.like;
  }
}

export class NotificationMessage extends BaseNotification {
  constructor(base: TNotificationBase) {
    super(base);
    this.type = INotificationType.message;
  }
}

export class NotificationMatch extends BaseNotification {
  constructor(base: TNotificationBase) {
    super(base);
    this.type = INotificationType.match;
  }
}

class NotificationFactory {
  static async create(
    type: INotificationType,
    params: TNotificationBase,
  ): Promise<Notification> {
    const TYPES = Object.freeze({
      [INotificationType.like]: (args: TNotificationBase) =>
        new NotificationLike(args),
      [INotificationType.match]: (args: TNotificationBase) =>
        new NotificationMatch(args),
      [INotificationType.message]: (args: TNotificationBase) =>
        new NotificationMessage(args),
    });

    const notification = TYPES[type](params);
    const notificationRepository = new NotificationRepository();
    const result = await notificationRepository.create(notification);
    return result;
  }

  static async match(
    paramsTo: TNotificationBase,
    paramsFrom: TNotificationBase,
  ) {
    const notificationToPromise = this.create(
      INotificationType.match,
      paramsTo,
    );
    const notificationFromPromise = this.create(
      INotificationType.match,
      paramsFrom,
    );
    const [to, from] = await Promise.all([
      notificationToPromise,
      notificationFromPromise,
    ]);

    return { to, from };
  }
}

export default NotificationFactory;
