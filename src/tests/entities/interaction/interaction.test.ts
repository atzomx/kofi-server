import "reflect-metadata";
import { IPagination } from "@core/domain/interfaces";
import TestUtils, {
  getEnumRandom,
} from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { Interaction } from "@entities/interactions";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { entities, app, authorization } from "@test/setup";
import { map } from "lodash";
import { Types } from "mongoose";
import request from "supertest-graphql";
import InteractionFaker from "../../fakers/interaction/interaction.faker";
import interactionQuerys from "./interaction.query";

const keysMandatories = Object.keys(Interaction);
describe("Interaction Test", () => {
  it("Should return an Interaction", async () => {
    const interaction = TestUtils.getOneFromArray(entities.interactions);
    const interactionId = interaction._id.toString();

    const result = await request<{ interactionById: Interaction }>(app)
      .query(interactionQuerys.interactionById)
      .variables({ interactionByIdId: interactionId })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionById");
    const data = result.data.interactionById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return an Interaction with unexist id", async () => {
    const interactionId = new Types.ObjectId().toString();
    const result = await request<{ interactionById: Interaction }>(app)
      .query(interactionQuerys.interactionById)
      .variables({ interactionByIdId: interactionId })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("Interaction not found");
  });

  it("Should create an Interaction", async () => {
    const participants = TestUtils.getManyFromArrayUnique(entities.users, 2);
    const { userTo, type } = InteractionFaker.get(map(participants, "_id"));

    const result = await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type } })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionCreate");
    const data = result.data["interactionCreate"] as Interaction;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should try create Interaction Match", async () => {
    const participants = TestUtils.getManyFromArrayUnique(entities.users, 2);
    const { userTo, userFrom } = InteractionFaker.get(map(participants, "_id"));
    const type = IInteractionTypes.like;

    const userFromToken = authUtils.getToken(userFrom.toString());

    await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type } })
      .set("authorization", `Token ${userFromToken}`);

    const userToToken = authUtils.getToken(userTo.toString());

    const result = await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo: userFrom, type } })
      .set("authorization", `Token ${userToToken}`);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionCreate");
    const data = result.data["interactionCreate"] as Interaction;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should try create exist Interaction", async () => {
    const participants = TestUtils.getManyFromArrayUnique(entities.users, 2);
    const { userTo, type } = InteractionFaker.get(map(participants, "_id"));

    await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type } })
      .set("authorization", authorization.LOVER);

    const result = await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type } })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionCreate");
    const data = result.data["interactionCreate"] as Interaction;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should update exist Interaction", async () => {
    const interactionExist = TestUtils.getOneFromArray(entities.interactions);

    const dataToSent: Partial<Interaction> = {
      type: IInteractionTypes.rejected,
    };

    const result = await request<{ interactionUpdate: Interaction }>(app)
      .query(interactionQuerys.interactionUpdate)
      .variables({
        data: dataToSent,
        interactionUpdateId: interactionExist._id.toString(),
      })
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionUpdate");
    const data = result.data["interactionUpdate"] as Interaction;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Should try update unexist Interaction", async () => {
    const interactionExistId = new Types.ObjectId().toString();

    const dataToSent: Partial<Interaction> = {
      type: IInteractionTypes.rejected,
    };

    const { errors } = await request<{ interactionUpdate: Interaction }>(app)
      .query(interactionQuerys.interactionUpdate)
      .variables({
        data: dataToSent,
        interactionUpdateId: interactionExistId,
      })
      .set("authorization", authorization.LOVER);

    expect(errors).toBeTruthy();
    const [error] = errors;
    expect(error.message).toBe("Interaction not found");
  });

  it("Should paginate Interaction", async () => {
    const variables = {
      page: 1,
      limit: 5,
      type: getEnumRandom(IInteractionTypes),
    };

    const result = await request<{
      interactionPaginate: IPagination<Interaction>;
    }>(app)
      .query(interactionQuerys.interactionPaginate)
      .variables(variables)
      .set("authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionPaginate");
    const data = result.data["interactionPaginate"];
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
