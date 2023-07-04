import "reflect-metadata";
import { map } from "lodash";
import supertest, { supertestWs } from "supertest-graphql";
import { IPagination } from "@core/domain/interfaces";
import testUtils, {
  getOneFromArray,
} from "@core/infrastructure/utils/test.utils";
import { getToken } from "@core/infrastructure/utils/token.utils";
import { Interaction } from "@entities/interactions";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { Message } from "@entities/messages";
import { Notification } from "@entities/notifications";
import { app, authorization, entities } from "@test/setup";
import notificationsQuerys from "./notifications.querys";
import InteractionFaker from "../../fakers/interaction/interaction.faker";
import interactionQuerys from "../interaction/interaction.query";
import messageQuerys from "../messages/message.querys";

describe("Chat Test", () => {
  it("Should paginate notifications", async () => {
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
      .set("Authorization", authtoken);

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

    const result1 = await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("Authorization", authorization.LOVER);

    expect(result1.errors).toBeUndefined();
    expect(result1.data).toHaveProperty("messageCreate");

    const sub = await supertestWs<{ notificationNew: Notification }>(app)
      .subscribe(notificationsQuerys.subscription)
      .connectionParams({
        Authorization: authorizationRecieber,
      });

    const result2 = await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("Authorization", authorization.LOVER);

    expect(result2.errors).toBeUndefined();
    expect(result2.data).toHaveProperty("messageCreate");

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

  it("Should subscribe to new notification by a like", async () => {
    const participants = testUtils.getManyFromArrayUnique(entities.users, 2);
    const { userTo } = InteractionFaker.get(map(participants, "_id"));

    const userToken = getToken(userTo.toString());
    const authorizationRecieber = `Token ${userToken}`;

    const sub = await supertestWs<{ notificationNew: Notification }>(app)
      .subscribe(notificationsQuerys.subscription)
      .connectionParams({
        Authorization: authorizationRecieber,
      });

    const result = await supertest<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type: IInteractionTypes.like } })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionCreate");

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
    expect(notificationNew.type).toBe(IInteractionTypes.like);
    expect(notificationNew.message).not.toBeNull();
    await sub.close();
  });
});
