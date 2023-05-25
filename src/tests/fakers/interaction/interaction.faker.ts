import { Types } from "mongoose";
import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Interaction } from "@entities/interactions";
import { IInteractionTypes } from "@entities/interactions/domain/interaction.enums";

class InteractionFaker {
  static get(users: Types.ObjectId[]): Interaction {
    return {
      userFrom: users[0],
      userTo: users[1],
      type: getEnumRandom(IInteractionTypes),
    };
  }
  static getEspecific(
    users: Types.ObjectId[],
    type: IInteractionTypes,
  ): Interaction {
    return {
      userFrom: users[0],
      userTo: users[1],
      type: type,
    };
  }
}

export default InteractionFaker;
