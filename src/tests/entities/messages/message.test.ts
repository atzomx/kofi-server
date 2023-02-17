import { IPagination } from "@core/domain/interfaces";
import {
  getOneFromArray,
  notInArray,
} from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { Message } from "@entities/messages";
import supertest, { supertestWs } from "supertest-graphql";
import { app, authorization, entities } from "../../setup";
import messageQuerys from "./message.querys";

describe("Chat Test", () => {
  let userToCreated = "";

  it("Should paginate messages by chat", async () => {
    const message = getOneFromArray(entities.messages);
    const variables = {
      page: 1,
      limit: 5,
      chat: message.chat.toString(),
    };

    const result = await supertest<{ messagePaginate: IPagination<Message> }>(
      app,
    )
      .query(messageQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("messagePaginate");
    const data = result.data["messagePaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
  });

  it("Should paginate messages by chat without params", async () => {
    const message = getOneFromArray(entities.messages);
    const variables = {
      chat: message.chat.toString(),
    };

    const result = await supertest<{ messagePaginate: IPagination<Message> }>(
      app,
    )
      .query(messageQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("messagePaginate");
    const data = result.data["messagePaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();
  });

  it("Should create a message to empty chat", async () => {
    const users = entities.users.map(({ _id }) => _id.toString());
    const usersWithChats = entities.chats
      .map(({ participants }) =>
        participants.map((participant) => participant.toString()),
      )
      .flat();

    const usersWithOutChats = notInArray(users, usersWithChats);
    userToCreated = getOneFromArray(usersWithOutChats);
    const message = {
      destinatary: userToCreated,
      message: "Hello",
    };

    const result = await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("messageCreate");
    const data = result.data["messageCreate"];
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("status");
  });

  it("Should create a message to an existing chat", async () => {
    const message = {
      destinatary: userToCreated,
      message: "Hello",
    };

    const result = await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("messageCreate");
    const data = result.data["messageCreate"];
    expect(data).toHaveProperty("message");
    expect(data).toHaveProperty("status");
  });

  it("Should subscribe to a messages channel", async () => {
    const destinatary = getOneFromArray(entities.users)._id.toString();
    const message = {
      destinatary,
      message: "Hello",
    };

    const userToken = authUtils.getToken(destinatary);
    const authorizationRecieber = `Token ${userToken}`;

    const response = await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    const chat = response.data.messageCreate.chat.toString();

    const sub = await supertestWs<{ messageNew: Message }>(app)
      .subscribe(messageQuerys.subscription)
      .variables({ chat })
      .connectionParams({
        authorization: authorizationRecieber,
      });

    await supertest<{ messageCreate: Message }>(app)
      .query(messageQuerys.create)
      .variables({ data: message })
      .set("authorization", authorization);

    const { data, errors } = await sub.next();
    expect(errors).toBeUndefined();
    expect(data).toHaveProperty("messageNew");

    const { messageNew } = data;
    expect(messageNew).toHaveProperty("chat");
    expect(messageNew).toHaveProperty("owner");
    expect(messageNew).toHaveProperty("message");
    expect(messageNew).toHaveProperty("status");

    await sub.close();
  });
});
