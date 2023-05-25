/* eslint-disable no-underscore-dangle */
import { Types } from "mongoose";
import { InteractionRepository } from "@entities/interactions";
import { Match } from "@entities/match";
import InteractionFaker from "../fakers/interaction/interaction.faker";

const up = async (matchs: Match[]) => {
  const interactionRepository = new InteractionRepository();
  const newInteractions = matchs
    .map((match) => {
      const { participants } = match;
      const userOne = new Types.ObjectId(participants[0].toString());
      const userTwo = new Types.ObjectId(participants[1].toString());
      return [
        InteractionFaker.get([userOne, userTwo]),
        InteractionFaker.get([userTwo, userOne]),
      ];
    })
    .flat();

  const interactionCreated = await interactionRepository.insertMany(
    newInteractions,
  );
  const cleanInteraction = interactionCreated.map(
    (interaction) => interaction._doc,
  );
  return cleanInteraction;
};

const down = async () => {
  const interactionRepository = new InteractionRepository();
  await interactionRepository.deleteMany();
};

export default { up, down };
