import { IPagination } from "@core/domain/interfaces";
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { getToken } from "@core/infrastructure/utils/token.utils";
import { Message } from "@entities/messages";
import { Notification } from "@entities/notifications";
import supertest, { supertestWs } from "supertest-graphql";
import { app, authorization, entities } from "../../setup";
import messageQuerys from "../messages/message.querys";
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

  it("Should subscribe to new notification by a message", async () => {
    const destinatary = getOneFromArray(entities.users)._id.toString();
    const message = {
      destinatary,
      message: "Hello",
    };

    const userToken = getToken(destinatary);
    const authorizationRecieber = `Token ${userToken}`;

    await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    const sub = await supertestWs<{ notificationNew: Notification }>(app)
      .subscribe(notificationsQuerys.subscription)
      .connectionParams({
        authorization: authorizationRecieber,
      });

    await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    const { data, errors } = await sub.next();
    expect(errors).toBeUndefined();
    expect(data).toHaveProperty("notificationNew");

    const { notificationNew } = data;
    expect(notificationNew).toHaveProperty("_id");
    expect(notificationNew).toHaveProperty("status");
    expect(notificationNew).toHaveProperty("type");
    expect(notificationNew).toHaveProperty("owner");
    expect(notificationNew).toHaveProperty("from");
    expect(notificationNew).toHaveProperty("message");
    expect(notificationNew).toHaveProperty("idReference");
    await sub.close();
  });
});
