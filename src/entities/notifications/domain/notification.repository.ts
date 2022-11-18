import { Repository } from "@core/domain";
import Notification from "./notification.entity";
import NotificationModel from "./notification.model";

class NotificationRepository extends Repository<Notification> {
  constructor() {
    super(NotificationModel);
  }
}

export default NotificationRepository;
