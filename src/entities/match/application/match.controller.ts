import { IPagination } from "@core/domain/interfaces";
import Match from "../domain/match.entity";
import { MatchNotFoundError } from "../domain/match.erros";
import MatchRepository from "../domain/match.repository";
import { MatchPaginationArgs } from "../infrastructure/match.args";
import { MatchInputUpdate } from "../infrastructure/match.inputs";

class MatchController {
  private repository: MatchRepository;

  constructor() {
    this.repository = new MatchRepository();
  }

  async findById(id: string) {
    const currentMatch = await this.repository
      .findById(id)
      .populate("participants", ["name", "email", "status"]);
    if (!currentMatch) throw new MatchNotFoundError();
    return currentMatch;
  }

  paginate({
    user,
    page,
    limit,
    status,
  }: MatchPaginationArgs & { user: string }): Promise<IPagination<Match>> {
    return this.repository.paginate(
      { participants: user, status },
      { limit, page },
    );
  }

  async update(id: string, match: MatchInputUpdate): Promise<Match> {
    const updatedMatch = await this.repository
      .findByIdAndUpdate(id, match)
      .populate("participants", ["name", "email", "status"]);
    if (!updatedMatch) throw new MatchNotFoundError();
    return updatedMatch;
  }
}

export default MatchController;
