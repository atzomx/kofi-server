import "reflect-metadata";
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import request from "supertest-graphql";
import { DEFAULT_PASSWORD } from "../../fakers/user/user.faker";
import { app, entities } from "../../setup";
import authQuerys from "./auth.querys";

describe("Login Test", () => {
  it("Should login an user with email", async () => {
    const user = getOneFromArray(entities.users);

    const result = await request<{ userLogin: { token: string } }>(app)
      .query(authQuerys.userLogin)
      .variables({ password: DEFAULT_PASSWORD, user: user.email });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userLogin");
    expect(result.data.userLogin).toHaveProperty("token");
  });

  it("Shouldn't login an unexist user", async () => {
    const result = await request<{ userLogin: { token: string } }>(app)
      .query(authQuerys.userLogin)
      .variables({ password: DEFAULT_PASSWORD, user: "example_9_3@mail.com" });

    expect(result.errors).toHaveLength(1);
    const [error] = result.errors;
    expect(error.message).toBe("Invalid Credentials");
  });

  it("Shouldn't login an user by wrong password", async () => {
    const user = getOneFromArray(entities.users);
    const result = await request<{ userLogin: { token: string } }>(app)
      .query(authQuerys.userLogin)
      .variables({ password: `${DEFAULT_PASSWORD}12`, user: user.email });

    expect(result.errors).toHaveLength(1);
    const [error] = result.errors;
    expect(error.message).toBe("Invalid Credentials");
  });
});
