import "reflect-metadata";
import { IPagination } from "@core/domain/interfaces";
import TestUtils, {
  getEnumRandom,
} from "@core/infrastructure/utils/test.utils";
import { Match } from "@entities/match";
import { IMatchStatus } from "@entities/match/domain/match.enums";
import { Types } from "mongoose";
import request from "supertest-graphql";
import { entities, app, authorization } from "../../setup";
import matchQuerys from "./match.query";

const keysMandatories = Object.keys(Match);
describe("Match Test", () => {
  it("Should return an Match", async () => {
    const match = TestUtils.getOneFromArray(entities.matchs);
    const matchId = match._id.toString();

    const result = await request<{ matchById: Match }>(app)
      .query(matchQuerys.matchById)
      .variables({ matchByIdId: matchId })
      .set("authorization", authorization);

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
      .set("authorization", authorization);

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
      .set("authorization", authorization);

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
      .set("authorization", authorization);

    expect(errors).toBeTruthy();
    const [error] = errors;
    expect(error.message).toBe("Match not found");
  });

  it("Should paginate Matchs", async () => {
    const variables = {
      page: 1,
      limit: 5,
      status: getEnumRandom(IMatchStatus),
    };

    const result = await request<{
      matchPaginate: IPagination<Match>;
    }>(app)
      .query(matchQuerys.matchPagination)
      .variables(variables)
      .set("authorization", authorization);

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
