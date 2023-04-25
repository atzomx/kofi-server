/* eslint-disable indent */
import {
  IVerificationPoses,
  IVerificationStatus,
} from "../domain/verification.enums";

type TSeaching = {
  userId?: string;
  createdAt?: Date;
  status?: IVerificationStatus;
  pose?: IVerificationPoses;
};

const searchingQuery = ({ userId, status, pose, createdAt }: TSeaching) => {
  const textQuery = userId
    ? {
        userId: userId,
      }
    : null;

  const dateQuery = createdAt ? { createdAt } : null;

  return {
    ...(status ? { status } : {}),
    ...(pose ? { pose } : {}),
    ...(textQuery ?? {}),
    ...(dateQuery ?? {}),
  };
};

export default {
  searchingQuery,
};
