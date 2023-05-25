import { faker } from "@faker-js/faker";
import { Types } from "mongoose";
import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import { Verification } from "@entities/verifications";
import {
  IVerificationStatus,
  IVerificationPoses,
} from "@entities/verifications/domain/verification.enums";

class VerificationFaker {
  static create(userId: Types.ObjectId) {
    const { status, ...complete } = VerificationFaker.get(userId);
    return complete;
  }

  static get(userId: Types.ObjectId): Verification {
    const detail = faker.lorem.paragraph(1).substring(0, 200);

    const complete: Verification = {
      media: faker.internet.avatar(),
      userId: userId,
      detail,
      status: getEnumRandom(IVerificationStatus),
      pose: getEnumRandom(IVerificationPoses),
    };
    return complete;
  }
}

export default VerificationFaker;
