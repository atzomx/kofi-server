import NotificationRepository from "../domain/notification.repository";
import { NotificationPaginationArgs } from "../infrastructure/notification.args";

class NotificationController {
  private repository: NotificationRepository;

  constructor() {
    this.repository = new NotificationRepository();
  }

  async paginate({
    user,
    limit,
    page,
  }: NotificationPaginationArgs & { user: string }) {
    const paginator = this.repository.paginate(
      { to: user },
      { limit, page },
      { createdAt: -1 },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }
}

export default NotificationController;
