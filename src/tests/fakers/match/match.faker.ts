import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Match } from "@entities/match";
import { IMatchStatus } from "@entities/match/domain/match.enums";

class MatchFaker {
  static get(users: string[]): Match {
    return {
      participants: users,
      status: getEnumRandom(IMatchStatus),
    };
  }
  static getEspecific(users: string[], status: IMatchStatus): Match {
    return {
      participants: users,
      status: status,
    };
  }
}

export default MatchFaker;
