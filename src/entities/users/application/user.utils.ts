/* eslint-disable indent */
import { Sanitizer } from "@core/infrastructure/utils";
import { IUserStatus } from "../domain/user.enums";

type TSeaching = {
  search?: string;
  endDate?: Date;
  startDate?: Date;
  status?: IUserStatus;
};

const searchingQuery = ({
  search = "",
  status,
  startDate,
  endDate = new Date(),
}: TSeaching) => {
  const cleanSearch = new Sanitizer(search).clean().accents().toString();
  const textQuery = cleanSearch
    ? {
        $or: [
          { email: { $regex: cleanSearch, $options: "i" } },
          { userName: { $regex: cleanSearch, $options: "i" } },
        ],
      }
    : null;

  const dateQuery = startDate
    ? { createdAt: { $gte: startDate, $lt: endDate } }
    : null;

  return {
    ...(status ? { status } : {}),
    ...(textQuery ?? {}),
    ...(dateQuery ?? {}),
  };
};

export default {
  searchingQuery,
};
