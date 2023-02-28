import { IPagination } from "@core/domain/interfaces";
import TestUtils, {
  getEnumRandom,
} from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { User } from "@entities/users";
import { Verification } from "@entities/verifications";
import {
  IVerificationPoses,
  IVerificationStatus,
} from "@entities/verifications/domain/verification.enums";
import { Types } from "mongoose";
import request from "supertest-graphql";
import UserFaker from "../../fakers/user/user.faker";
import VerificationFaker from "../../fakers/verifications/verification.faker";
import { app, authorization, entities } from "../../setup";
import userQuerys from "../users/user.querys";
import verificationQuerys from "./verification.query";

const keysMandatories = Object.keys(Verification);

describe("Verification Test", () => {
  it("Should return an verification", async () => {
    const verification = TestUtils.getOneFromArray(entities.verifications);
    const verificationId = verification._id.toString();

    const result = await request<{ verificationById: Verification }>(app)
      .query(verificationQuerys.verificationById)
      .variables({ verificationById: verificationId })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationById");
    const data = result.data.verificationById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should return an verification from id token", async () => {
    const verification = TestUtils.getOneFromArray(entities.verifications);
    const userToken = authUtils.getToken(verification.userId.toString());
    const authorization = `Token ${userToken}`;

    const result = await request<{ verificationMe: Verification }>(app)
      .query(verificationQuerys.verificationMe)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationMe");
    const data = result.data.verificationMe;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return an verification with unexist id", async () => {
    const verification = new Types.ObjectId().toString();
    const result = await request<{ verificationById: Verification }>(app)
      .query(verificationQuerys.verificationById)
      .variables({ verificationById: verification })
      .set("authorization", authorization);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("Verification not found");
  });

  it("Should paginate verification", async () => {
    const createdAt = new Date();

    const variables = {
      page: 1,
      limit: 5,
      status: getEnumRandom(IVerificationStatus),
      pose: getEnumRandom(IVerificationPoses),
      createdAt,
      userId: new Types.ObjectId().toString(),
    };

    const result = await request<{
      verificationPaginate: IPagination<Verification>;
    }>(app)
      .query(verificationQuerys.verificationPaginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationPaginate");
    const data = result.data["verificationPaginate"];
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

  it("Should paginate verification without params", async () => {
    const variables = {
      page: 1,
      limit: 5,
    };

    const result = await request<{
      verificationPaginate: IPagination<Verification>;
    }>(app)
      .query(verificationQuerys.verificationPaginate)
      .variables(variables)
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationPaginate");
    const data = result.data["verificationPaginate"];
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

  it("Shouldn't create an verification with bad arguments", async () => {
    const userFakeId = new Types.ObjectId();
    const newVerification = VerificationFaker.get(userFakeId);
    const { errors } = await request<{ verificationCreate: Verification }>(app)
      .query(verificationQuerys.verificationCreate)
      .variables({ data: newVerification });

    expect(errors).toBeTruthy();
  });

  it("Should create an verification", async () => {
    const newUser = UserFaker.basic();

    const resultUser = await request<{ userCreate: User }>(app)
      .query(userQuerys.userCreate)
      .variables({ data: newUser });

    const dataUser = resultUser.data.userCreate;
    const userExistId = dataUser._id.toString();
    const newVerification = VerificationFaker.create(
      new Types.ObjectId(userExistId),
    );

    const result = await request<{ verificationCreate: Verification }>(app)
      .query(verificationQuerys.verificationCreate)
      .variables({ data: newVerification })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationCreate");
    const data = result.data["verificationCreate"] as Verification;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should try create exits verification", async () => {
    const verificationExist = TestUtils.getOneFromArray(entities.verifications);
    const userExistId = verificationExist.userId.toString();
    const newVerification = VerificationFaker.create(
      new Types.ObjectId(userExistId),
    );

    const { errors } = await request<{ verificationCreate: Verification }>(app)
      .query(verificationQuerys.verificationCreate)
      .variables({ data: newVerification })
      .set("authorization", authorization);

    expect(errors).toBeTruthy();
  });

  it("Should try update exits verification", async () => {
    const verificationExist = TestUtils.getOneFromArray(entities.verifications);
    const verificationExistId = verificationExist._id.toString();
    const dataToSent: Partial<Verification> = {
      status: IVerificationStatus.success,
    };

    const result = await request<{ verificationUpdate: Verification }>(app)
      .query(verificationQuerys.verificationUpdate)
      .variables({
        data: dataToSent,
        verificationUpdateId: verificationExistId,
      })
      .set("authorization", authorization);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("verificationUpdate");
    const data = result.data["verificationUpdate"] as Verification;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should try update unexits verification", async () => {
    const verificationExistId = new Types.ObjectId().toString();
    const dataToSent: Partial<Verification> = {
      status: IVerificationStatus.success,
    };

    const { errors } = await request<{ verificationUpdate: Verification }>(app)
      .query(verificationQuerys.verificationUpdate)
      .variables({
        data: dataToSent,
        verificationUpdateId: verificationExistId,
      })
      .set("authorization", authorization);

    expect(errors).toBeTruthy();
  });
});
