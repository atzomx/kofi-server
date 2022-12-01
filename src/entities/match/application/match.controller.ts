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
    const currentMatch = await this.repository.findById(id);
    if (!currentMatch) throw new MatchNotFoundError();
    return currentMatch;
  }

  async paginate({
    user,
    page,
    limit,
    status,
  }: MatchPaginationArgs & { user: string }): Promise<IPagination<Match>> {
    const paginator = this.repository.paginate(
      { participants: user, status },
      { limit, page },
    );

    const [results, total] = await Promise.all([
      paginator.getResults(),
      paginator.getTotal(),
    ]);

    const pages = Math.ceil(total / limit);
    return {
      results: results,
      info: {
        total,
        page,
        pages,
      },
    };
  }

  async update(id: string, match: MatchInputUpdate): Promise<Match> {
    const updatedMatch = await this.repository.findByIdAndUpdate(id, match);
    if (!updatedMatch) throw new MatchNotFoundError();
    return updatedMatch;
  }
}

export default MatchController;
