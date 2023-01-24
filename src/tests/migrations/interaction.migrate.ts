/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { InteractionRepository } from "@entities/interactions";
import { User } from "@entities/users";
import InteractionFaker from "../fakers/interaction/interaction.faker";

const TOTAL_INTERACTIONS = 10;

const up = async (users: User[]) => {
  const interactionRepository = new InteractionRepository();
  const newInteractions = Array.from({ length: TOTAL_INTERACTIONS }).map(() => {
    const userOne = getOneFromArray(users)._id;
    const userTwo = getOneFromArray(users)._id;
    const participants = [userOne, userTwo];
    return InteractionFaker.get(participants);
  });

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
