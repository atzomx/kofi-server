import { IPagination } from "@core/domain/interfaces";
import Notification from "../domain/notification.entity";
import NotificationRepository from "../domain/notification.repository";
import { NotificationPaginationArgs } from "../infrastructure/notification.args";

class NotificationController {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  paginate({
    user,
    limit,
    page,
  }: NotificationPaginationArgs & { user: string }): Promise<
    IPagination<Notification>
  > {
    return this.repository.paginate(
      { owner: user },
      { limit, page, sort: { createdAt: -1 } },
    );
  }
}

export default NotificationController;
