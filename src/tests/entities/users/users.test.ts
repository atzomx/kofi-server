import "reflect-metadata";
import { Types } from "mongoose";
import request from "supertest-graphql";
import { IPagination } from "@core/domain/interfaces";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { Media } from "@entities/media";
import { User } from "@entities/users";
import { IUserRole } from "@entities/users/domain/user.enums";
import MediaFaker from "@test/fakers/media/media.faker";
import { app, authorization, entities, users } from "@test/setup";
import userQuerys from "./user.querys";
import UserFaker from "../../fakers/user/user.faker";

const keysMandatories = Object.keys(User);

describe("User Test", () => {
  it("Should return an user", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();

    const result = await request<{ userById: User }>(app)
      .query(userQuerys.userById)
      .variables({ user: userId })
      .set("Authorization", authorization.MODERATOR);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userById");
    const data = result.data.userById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return an user with unexist id", async () => {
    const userId = new Types.ObjectId().toString();
    const result = await request<{ userById: User }>(app)
      .query(userQuerys.userById)
      .variables({ user: userId })
      .set("Authorization", authorization.MODERATOR);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("User not found");
  });

  it("Should return an user from token", async () => {
    const result = await request<{ userMe: User }>(app)
      .query(userQuerys.userMe)
      .set("Authorization", authorization.LOVER);

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
      .set("Authorization", authorization.LOVER);

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
      .set("Authorization", authorization.MODERATOR);

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
      .set("Authorization", authorization.MODERATOR);

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
    newUser.name = "longestUserName128828282";
    const { errors } = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    expect(errors).toBeTruthy();
  });

  it("Should create an user", async () => {
    const newUser = UserFaker.basic();

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

  it("Should update an user with MODERATOR role", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();

    const dataToSent: Partial<User> = {
      name: "ModifyName",
    };
    const { errors, data } = await request<{ userUpdate: User }>(app)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId })
      .set("Authorization", authorization.MODERATOR);

    expect(errors).toBeUndefined();
    expect(data.userUpdate.name).toBe(dataToSent.name);
  });

  it("Shouldn't update an user role", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();

    const dataToSent: Partial<User> = {
      role: IUserRole.ADMIN,
    };
    const { errors } = await request<{ userUpdate: User }>(app)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId })
      .set("Authorization", authorization.MODERATOR);

    expect(errors).toBeTruthy();
  });

  it("Shouldn't update a user with a corrupted identifier", async () => {
    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();
    const dataToSent: Partial<User> = {
      name: "AlteredName",
    };
    const { errors } = await request<{ userUpdate: User }>(app)
      .query(userQuerys.userUpdate)
      .variables({ data: dataToSent, userId: `${userId}xxss` })
      .set("Authorization", authorization.MODERATOR);

    expect(errors).toBeTruthy();
  });

  it("Shouldn't create a user with the same email", async () => {
    const userExisted = TestUtils.getOneFromArray(entities.users);
    const newUser = UserFaker.basic();
    newUser.email = userExisted.email;

    const { errors } = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser })
      .set("Authorization", authorization.LOVER);

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
    expect(error.message).toBe(
      "Access denied! You don't have permission for this action!",
    );
  });

  it("Shouldn't access a protected resolver by currupted token key", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userPaginate: IPagination<User> }>(app)
      .query(userQuerys.paginate)
      .variables(variables)
      .set("Authorization", `Not${authorization}`);

    const [error] = result.errors;
    expect(error.message).toBe("Context creation failed: Invalid Credentials");
  });

  it("Should update by user token", async () => {
    const preferencesNew = UserFaker.getPreferences();
    const informationNew = UserFaker.getInformation(entities.medias, true);
    const dataToSent = {
      name: "AlteredName",
      preferences: preferencesNew,
      information: informationNew,
    };
    const { data, errors } = await request<{ userUpdateMe: User }>(app)
      .query(userQuerys.userUpdateMe)
      .variables({ data: dataToSent })
      .set("Authorization", authorization.LOVER);

    expect(errors).toBeUndefined();
    expect(data).not.toBeUndefined();
    expect(data).toHaveProperty("userUpdateMe");

    expect(data.userUpdateMe.name).toBe(dataToSent.name);

    const { preferences, information } = data.userUpdateMe;

    expect(preferences.degree).toBe(preferencesNew.degree);
    expect(preferences.lookingFor).toBe(preferencesNew.lookingFor);
    expect(preferences.maritalStatus).toBe(preferencesNew.maritalStatus);
    expect(preferences.personality).toBe(preferencesNew.personality);
    expect(preferences.pets).toBe(preferencesNew.pets);
    expect(preferences.religion).toBe(preferencesNew.religion);
    expect(preferences.sexualPreference).toBe(preferencesNew.sexualPreference);
    expect(preferences.ageRange.min).toBe(preferencesNew.ageRange.min);
    expect(preferences.ageRange.max).toBe(preferencesNew.ageRange.max);

    expect(information.degree).toBe(informationNew.degree);
    expect(information.lookingFor).toBe(informationNew.lookingFor);
    expect(information.maritalStatus).toBe(informationNew.maritalStatus);
    expect(information.personality).toBe(informationNew.personality);
    expect(information.pets).toBe(informationNew.pets);
    expect(information.religion).toBe(informationNew.religion);
    expect(information.sexualOrientation).toBe(
      informationNew.sexualOrientation,
    );
    expect(information.location[0]).toBe(informationNew.location[0]);
    expect(information.location[1]).toBe(informationNew.location[1]);
    information.medias.forEach((media) => {
      expect(media).toHaveProperty("type");
      expect(media).toHaveProperty("url");
      expect(media).toHaveProperty("_id");
    });
  });

  it("Should return queue of users", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{ userQueue: IPagination<User> }>(app)
      .query(userQuerys.userQueue)
      .variables(variables)
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userQueue");
    const data = result.data["userQueue"];
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

  it("Should create an user media", async () => {
    const result = await request<{ userMediaCreate: Media[] }>(app)
      .query(userQuerys.userMediaCreate)
      .variables({ data: MediaFaker.get() })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userMediaCreate");
    const data = result.data["userMediaCreate"];
    data.forEach((media) => {
      expect(media).toHaveProperty("_id");
      expect(media).toHaveProperty("url");
      expect(media).toHaveProperty("type");
    });
  });

  it("Should delete an user media", async () => {
    const [mediaId] = users.LOVER.information.medias;
    const result = await request<{ userMediaDelete: Media[] }>(app)
      .query(userQuerys.userMediaDelete)
      .variables({ id: mediaId.toString() })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userMediaDelete");
    const data = result.data["userMediaDelete"];
    data.forEach((media) => {
      expect(media).toHaveProperty("_id");
      expect(media).toHaveProperty("url");
      expect(media).toHaveProperty("type");
    });
    const newMedias = data.map(({ _id }) => _id.toString());
    users.LOVER.information.medias = newMedias;
  });

  it("Should order an user medias", async () => {
    const medias = users.LOVER.information.medias.map((value) =>
      value.toString(),
    );
    const [first, ...rest] = medias;
    const mediasAltered = [...rest, first];
    const result = await request<{ userMediaOrder: Media[] }>(app)
      .query(userQuerys.userMediaOrder)
      .variables({ data: { medias: mediasAltered } })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("userMediaOrder");
    const data = result.data["userMediaOrder"];
    data.forEach((media) => {
      expect(media).toHaveProperty("_id");
      expect(media).toHaveProperty("url");
      expect(media).toHaveProperty("type");
    });
    const orderedMedias = data.map(({ _id }) => _id.toString());
    expect(mediasAltered).toStrictEqual(orderedMedias);
  });
});
