/* eslint-disable indent */
import { Sanitize, Sanitizer } from "@core/infrastructure/utils";
import { IUserStatus } from "../domain/user.enums";

type TSanitize = {
  name: string;
};

type TSeaching = {
  search?: string;
  endDate?: Date;
  startDate?: Date;
  status?: IUserStatus;
};

const sanitize = ({
  name: _nm,
}: TSanitize) => {
  const fullName = Sanitize.clean(_nm);
  return {
    fullName,
  };
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
          { normalizedFullName: { $regex: cleanSearch, $options: "i" } },
          { email: { $regex: cleanSearch, $options: "i" } },
          { phoneNumber: { $regex: cleanSearch, $options: "i" } },
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
  sanitize,
  searchingQuery,
};
