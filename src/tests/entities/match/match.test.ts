import "reflect-metadata";
import { Types } from "mongoose";
import request from "supertest-graphql";
import { IPagination } from "@core/domain/interfaces";
import TestUtils, {
  getEnumRandom,
} from "@core/infrastructure/utils/test.utils";
import TokenUtils from "@core/infrastructure/utils/token.utils";
import { Interaction } from "@entities/interactions";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { Match } from "@entities/match";
import { IMatchStatus } from "@entities/match/domain/match.enums";
import { entities, app, authorization } from "@test/setup";
import matchQuerys from "./match.query";
import interactionQuerys from "../interaction/interaction.query";

const keysMandatories = Object.keys(Match);
describe("Match Test", () => {
  it("Should return an Match", async () => {
    const match = TestUtils.getOneFromArray(entities.matchs);
    const matchId = match._id.toString();

    const result = await request<{ matchById: Match }>(app)
      .query(matchQuerys.matchById)
      .variables({ matchByIdId: matchId })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("matchById");
    const data = result.data.matchById;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });

  it("Shouldn't return an Match with unexist id", async () => {
    const matchId = new Types.ObjectId().toString();

    const result = await request<{ matchById: Match }>(app)
      .query(matchQuerys.matchById)
      .variables({ matchByIdId: matchId })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeTruthy();
    const [error] = result.errors;
    expect(error.message).toBe("Match not found");
  });

  it("Should update exist Match", async () => {
    const matchExist = TestUtils.getOneFromArray(entities.matchs);

    const dataToSent: Partial<Match> = {
      status: IMatchStatus.rejected,
    };

    const result = await request<{ matchUpdate: Match }>(app)
      .query(matchQuerys.matchUpdate)
      .variables({
        data: dataToSent,
        matchUpdateId: matchExist._id.toString(),
      })
      .set("Authorization", authorization.LOVER);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("matchUpdate");
    const data = result.data["matchUpdate"] as Match;
    keysMandatories.forEach((key) => {
      expect(data).toHaveProperty(key);
    });
  });
  it("Should try update unexist Interaction", async () => {
    const matchExistId = new Types.ObjectId().toString();

    const dataToSent: Partial<Match> = {
      status: IMatchStatus.rejected,
    };

    const { errors } = await request<{ matchUpdate: Match }>(app)
      .query(matchQuerys.matchUpdate)
      .variables({
        data: dataToSent,
        matchUpdateId: matchExistId,
      })
      .set("Authorization", authorization.LOVER);

    expect(errors).toBeTruthy();
    const [error] = errors;
    expect(error.message).toBe("Match not found");
  });

  it("Should created a exiting Match", async () => {
    const match = TestUtils.getOneFromArray(entities.matchs);
    const { participants } = match;
    const userTo = participants[0];
    const userFrom = participants[1];

    const type = IInteractionTypes.like;

    const userFromToken = TokenUtils.getToken(userFrom.toString());

    const result = await request<{ interactionCreate: Interaction }>(app)
      .query(interactionQuerys.interactionCreate)
      .variables({ data: { userTo, type } })
      .set("Authorization", `Token ${userFromToken}`);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("interactionCreate");
  });

  it("Should paginate Matchs", async () => {
    const variables = {
      page: 1,
      limit: 5,
      status: getEnumRandom(IMatchStatus),
    };

    const matchUser = entities.matchs[0].participants[0];
    const userId = matchUser.toString();
    const token = `Token ${TokenUtils.getToken(userId)}`;

    const result = await request<{
      matchPaginate: IPagination<Match>;
    }>(app)
      .query(matchQuerys.matchPagination)
      .variables(variables)
      .set("Authorization", token);

    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty("matchPaginate");
    const data = result.data["matchPaginate"];
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
