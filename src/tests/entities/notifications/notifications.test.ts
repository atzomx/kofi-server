import { IPagination } from "@core/domain/interfaces";
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { getToken } from "@core/infrastructure/utils/token.utils";
import { Notification } from "@entities/notifications";
import supertest from "supertest-graphql";
import { app, entities } from "../../setup";
import notificationsQuerys from "./notifications.querys";

describe("Chat Test", () => {
  it("Should paginate messages by chat", async () => {
    const notification = getOneFromArray(entities.notifications);
    const variables = {
      page: 1,
      limit: 5,
    };

    const authtoken = `Token ${getToken(notification.owner.toString())}`;

    const result = await supertest<{
      notificationPaginate: IPagination<Notification>;
    }>(app)
      .query(notificationsQuerys.paginate)
      .variables(variables)
      .set("authorization", authtoken);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("notificationPaginate");
    const data = result.data["notificationPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
  });
});
