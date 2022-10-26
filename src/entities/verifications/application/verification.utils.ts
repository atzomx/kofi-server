/* eslint-disable indent */
import { Sanitizer } from "@core/infrastructure/utils";
import {
  IVerificationPoses,
  IVerificationStatus,
} from "../domain/verification.enums";

type TSeaching = {
  search?: string;
  createdAt?: Date;
  status?: IVerificationStatus;
  pose?: IVerificationPoses;
};

const searchingQuery = ({
  search = "",
  status,
  pose,
  createdAt,
}: TSeaching) => {
  const cleanSearch = new Sanitizer(search).clean().accents().toString();
  const textQuery = cleanSearch
    ? {
        $or: [{ userId: { $regex: cleanSearch, $options: "i" } }],
      }
    : null;

  const dateQuery = createdAt ? { createdAt: { createdAt } } : null;

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
