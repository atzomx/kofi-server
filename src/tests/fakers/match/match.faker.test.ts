import { Types } from "mongoose";
import "reflect-metadata";
import MatchFaker from "./match.faker";

describe("Match faker", () => {
  it("Should return a Match random", () => {
    const participants = [
      new Types.ObjectId().toString(),
      new Types.ObjectId().toString(),
    ];
    const match = MatchFaker.get(participants);
    expect(match).toHaveProperty("participants");
    expect(match).toHaveProperty("status");
  });
});
