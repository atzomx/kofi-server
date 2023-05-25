import "reflect-metadata";
import { Types } from "mongoose";
import {
  IVerificationPoses,
  IVerificationStatus,
} from "@entities/verifications/domain/verification.enums";
import VerificationFaker from "./verification.faker";

const keysRequired = ["media", "userId", "detail", "status", "pose"];

describe("Verification faker", () => {
  it("Should return a Verification random", () => {
    const verification = VerificationFaker.get(new Types.ObjectId());
    [...keysRequired].forEach((key) => {
      expect(verification).toHaveProperty(key);
    });
    const StatusValues = Object.values(IVerificationStatus);
    expect(StatusValues.includes(verification.status)).toBeTruthy();

    const PosesValues = Object.values(IVerificationPoses);
    expect(PosesValues.includes(verification.pose)).toBeTruthy();
  });
});
