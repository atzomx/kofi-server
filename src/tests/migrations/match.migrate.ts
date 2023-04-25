/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { MatchRepository } from "@entities/match";
import { IMatchStatus } from "@entities/match/domain/match.enums";
import { User } from "@entities/users";
import MatchFaker from "../fakers/match/match.faker";

const TOTAL_MATCHS = 5;

const up = async (users: User[]) => {
  const matchRepository = new MatchRepository();

  const newMatch = Array.from({ length: TOTAL_MATCHS }).map(() => {
    const userOne = getOneFromArray(users)._id;
    const userTwo = getOneFromArray(users)._id;
    return MatchFaker.getEspecific(
      [userOne.toString(), userTwo.toString()],
      IMatchStatus.actived,
    );
  });

  const matchCreated = await matchRepository.insertMany(newMatch);

  const cleanMacth = matchCreated.map((match) => match._doc);
  return cleanMacth;
};

const down = async () => {
  const matchRepository = new MatchRepository();
  await matchRepository.deleteMany();
};

export default { up, down };
