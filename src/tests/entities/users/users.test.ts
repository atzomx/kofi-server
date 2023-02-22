import { IPagination } from "@core/domain/interfaces";
import TestUtils from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { User } from "@entities/users";
import { IUserLookingFor } from "@entities/users/domain/user.enums";
import { Types } from "mongoose";
import request from "supertest-graphql";
import UserFaker from "../../fakers/user/user.faker";
import { app, authorization, entities } from "../../setup";
import userQuerys from "./user.querys";

const keysMandatories = Object.keys(User);

describe("User Test", () => {
  it("Should return an user", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();

    const result = await request<{ userById: User }>(app)
      .query(userQuerys.userById)
      .variables({ user: userId })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userById");
    const data = result.data.userById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should return an user from token", async () => {
    const result = await request<{ userMe: User }>(app)
      .query(userQuerys.userMe)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userMe");
    const data = result.data.userMe;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return an user with unexist id", async () => {
    const user = new Types.ObjectId().toString();
    const result = await request<{ userById: User }>(app)
      .query(userQuerys.userById)
      .variables({ user })
      .set("authorization", authorization);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("User not found");
  });

  it("Should paginate users", async () => {
    const currentDate = new Date();
    const endDate = new Date();
    const startDate = new Date();
    endDate.setDate(currentDate.getDate() + 10);
    startDate.setDate(currentDate.getDate() - 10);

    const variables = {
      page: 1,
      limit: 5,
      endDate,
      startDate,
      search: "a",
      status: "pending",
    };

    const result = await request<{ userPaginate: IPagination<User> }>(app)
      .query(userQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userPaginate");
    const data = result.data["userPaginate"];
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

  it("Should paginate users without params", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userPaginate: IPagination<User> }>(app)
      .query(userQuerys.paginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userPaginate");
    const data = result.data["userPaginate"];
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

  it("Shouldn't create an user with bad arguments", async () => {
    const newUser = UserFaker.create();
    newUser.userName = "longestUserName128828282";
    const { errors } = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    expect(errors).toBeTruthy();
  });

  it("Should create an user", async () => {
    const newUser = UserFaker.create();

    const result = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userCreate");
    const data = result.data["userCreate"] as User;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
    expect(data.status).toBe("pending");
  });

  it("Should update an user", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();
    const userToken = authUtils.getToken(userId);
    const authorization = `Token ${userToken}`;
    const dataToSent: Partial<User> = {
      lookingFor: IUserLookingFor.friends,
    };
    const { data, errors } = await request<{ userUpdate: User }>(app)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId })
      .set("authorization", authorization);

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveProperty("userUpdate");

    expect(data.userUpdate.lookingFor).toBe(dataToSent.lookingFor);

    keysMandatories.forEach((key) => {
      expect(data.userUpdate).toHaveProperty(key);
    });
  });

  it("Shouldn't update a user with a corrupted identifier", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();
    const userToken = authUtils.getToken(userId);
    const authorization = `Token ${userToken}`;
    const dataToSent: Partial<User> = {
      lookingFor: IUserLookingFor.friends,
    };
    const { errors } = await request<{ userUpdate: User }>(app)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId: `${userId}xxss` })
      .set("authorization", authorization);

    expect(errors).toBeTruthy();
  });

  it("Shouldn't create a user with the same userName", async () => {
    const userExisted = TestUtils.getOneFromArray(entities.users);
    const newUser = UserFaker.create();
    newUser.userName = userExisted.userName;

    const { errors } = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser })
      .set("authorization", authorization);

    expect(errors).toBeTruthy();
    const [error] = errors;
    expect(error.message).toBe("User already exists");
  });

  it("Shouldn't access a protected resolver with no token", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userPaginate: IPagination<User> }>(app)
      .query(userQuerys.paginate)
      .variables(variables);

    const [error] = result.errors;
    expect(error.message).toBe("Invalid token");
  });

  it("Shouldn't access a protected resolver by currupted token key", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userPaginate: IPagination<User> }>(app)
      .query(userQuerys.paginate)
      .variables(variables)
      .set("authorization", `Not${authorization}`);

    const [error] = result.errors;
    expect(error.message).toBe("Invalid token");
  });

  it("Should update by user", async () => {
    const dataToSent: Partial<User> = {
      lookingFor: IUserLookingFor.friends,
    };
    const { data, errors } = await request<{ userUpdateMe: User }>(app)
      .query(userQuerys.userUpdateMe)
      .variables({ data: dataToSent })
      .set("authorization", authorization);

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveProperty("userUpdateMe");

    expect(data.userUpdateMe.lookingFor).toBe(dataToSent.lookingFor);

    keysMandatories.forEach((key) => {
      expect(data.userUpdateMe).toHaveProperty(key);
    });
  });
});
