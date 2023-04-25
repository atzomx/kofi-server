import "reflect-metadata";
import { IPagination } from "@core/domain/interfaces";
import { Chat } from "@entities/chat";
import { app, authorization } from "@test/setup";
import request from "supertest-graphql";
import chatQuerys from "./chat.querys";

const keysMandatories = ["createdAt", "updatedAt", "_id", "participants"];

describe("Chat test", () => {
  it("Should paginate chats", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ chatPaginate: IPagination<Chat> }>(app)
      .query(chatQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("chatPaginate");
    const data = result.data["chatPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();

    results.forEach((user) => {
      keysMandatories.forEach((key) => {
        expect(user).toHaveProperty(key);
      });
    });
  });

  it("Should paginate chats without params", async () => {
    const result = await request<{ chatPaginate: IPagination<Chat> }>(app)
      .query(chatQuerys.paginate)
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("chatPaginate");
    const data = result.data["chatPaginate"];
    expect(data).toHaveProperty("info");
    expect(data).toHaveProperty("results");
    const info = data["info"];
    expect(info).toHaveProperty("page");
    expect(info).toHaveProperty("pages");
    expect(info).toHaveProperty("total");
    const { results } = data;
    expect(results instanceof Array).toBeTruthy();

    results.forEach((user) => {
      keysMandatories.forEach((key) => {
        expect(user).toHaveProperty(key);
      });
    });
  });
});
