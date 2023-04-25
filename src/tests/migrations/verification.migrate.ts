/* eslint-disable no-underscore-dangle */
import { getOneFromArray } from "@core/infrastructure/utils/test.utils";
import { User } from "@entities/users";
import { VerificationRepository } from "@entities/verifications";
import VerificationFaker from "../fakers/verifications/verification.faker";

const TOTAL_VERIFICATION = 20;

const up = async (users: User[]) => {
  const verificationRepository = new VerificationRepository();
  const newVerifications = Array.from({ length: TOTAL_VERIFICATION }).map(
    () => {
      const userValidate = getOneFromArray(users)._id;
      return VerificationFaker.get(userValidate);
    },
  );

  const verificationCreated = await verificationRepository.insertMany(
    newVerifications,
  );
  const cleanVerifications = verificationCreated.map(
    (verification) => verification._doc,
  );
  return cleanVerifications;
};

const down = async () => {
  const verificationRepository = new VerificationRepository();
  await verificationRepository.deleteMany();
};

export default { up, down };
