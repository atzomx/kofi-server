import { Repository } from "@core/domain";
import Match from "./match.entity";
import { IMatchStatus } from "./match.enums";
import MatchModel from "./match.model";

class MatchRepository extends Repository<Match> {
  constructor() {
    super(MatchModel);
  }

  async findOrCreateMatch(ids: string[]): Promise<Match> {
    const reverseIds = [...ids].reverse();

    const query = {
      $or: [{ participants: ids }, { participants: reverseIds }],
    };
    const macthByIds = await this.instance.findOneAndUpdate<Match>(query, {
      updateAt: Date.now(),
    });
    if (macthByIds) return macthByIds;

    const macthCreated = await this.create({
      participants: ids,
      status: IMatchStatus.actived,
    });
    return macthCreated;
  }
}

export default MatchRepository;
