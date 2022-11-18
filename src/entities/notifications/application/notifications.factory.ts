import Notification from "../domain/notification.entity";
import { INotificationType } from "../domain/notification.enum";

class NotificationLike extends Notification {
  constructor() {
    super();
    this.seen = false;
    this.leyend = "te ha dado like";
    this.message = "";
    this.from = "Erick Andrade";
    this.type = INotificationType.like;
  }
}

class NotificationMessage extends Notification {
  constructor() {
    super();
    this.seen = false;
    this.leyend = "te dicho";
    this.message = "Hola";
    this.from = "Erick Andrade";
    this.type = INotificationType.message;
  }
}

class NotificationMatch extends Notification {
  constructor() {
    super();
    this.seen = false;
    this.leyend = "ha hecho match";
    this.message = "";
    this.from = "Erick Andrade";
    this.type = INotificationType.match;
  }
}

class NotificationFactory {
  static create(type: INotificationType): Notification {
    switch (type) {
      case INotificationType.like:
        return new NotificationLike();
      case INotificationType.match:
        return new NotificationMatch();
      case INotificationType.message:
        return new NotificationMessage();
      default:
        throw new Error(`It doesnt't exist a kind of notification for ${type}`);
    }
  }
}

export default NotificationFactory;
