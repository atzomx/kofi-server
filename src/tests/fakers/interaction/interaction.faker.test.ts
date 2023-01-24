import { Types } from "mongoose";
import "reflect-metadata";
import MatchFaker from "./interaction.faker";

describe("Interaction faker", () => {
  it("Should return a Interaction random", () => {
    const participants = [new Types.ObjectId(), new Types.ObjectId()];
    const interaction = MatchFaker.get(participants);
    expect(interaction).toHaveProperty("userFrom");
    expect(interaction).toHaveProperty("userTo");
    expect(interaction).toHaveProperty("type");
  });
});
