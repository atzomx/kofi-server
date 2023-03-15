import "reflect-metadata";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";
import { Types } from "mongoose";
import MatchFaker from "./interaction.faker";

describe("Interaction faker", () => {
  it("Should return a Interaction random", () => {
    const participants = [new Types.ObjectId(), new Types.ObjectId()];
    const interaction = MatchFaker.get(participants);
    expect(interaction).toHaveProperty("userFrom");
    expect(interaction).toHaveProperty("userTo");
    expect(interaction).toHaveProperty("type");
  });
  it("Should return a Interaction specific", () => {
    const participants = [new Types.ObjectId(), new Types.ObjectId()];
    const interaction = MatchFaker.getEspecific(
      participants,
      IInteractionTypes.like,
    );
    expect(interaction).toHaveProperty("userFrom");
    expect(interaction).toHaveProperty("userTo");
    expect(interaction).toHaveProperty("type");
  });
});
