import { Repository } from "@core/domain";
import Interaction from "./interaction.entity";
import InteractionModel from "./interaction.model";

class InteractionRepository extends Repository<Interaction> {
  constructor() {
    super(InteractionModel);
  }
}

export default InteractionRepository;
