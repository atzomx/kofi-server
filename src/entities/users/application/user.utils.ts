/* eslint-disable indent */
import { Sanitize, Sanitizer } from "@core/infrastructure/utils";
import { IUserGender, IUserStatus } from "../domain/user.enums";

type TSanitize = {
  firstName: string;
  lastName: string;
  secondLastName: string;
  curp: string;
};

type TSeaching = {
  search?: string;
  endDate?: Date;
  startDate?: Date;
  status?: IUserStatus;
  gender?: IUserGender;
};

const sanitize = ({
  firstName: _fn,
  lastName: _ln,
  secondLastName: _sln,
  curp,
}: TSanitize) => {
  const fullName = [_fn, _ln, _sln].map(Sanitize.clean);
  const [firstName, lastName, secondLastName] = fullName;
  const normalizedFullName = Sanitize.accents(fullName.join(" "));
  return {
    normalizedFullName,
    firstName,
    lastName,
    secondLastName,
    curp: Sanitize.clean(curp),
  };
};

const searchingQuery = ({
  search = "",
  status,
  gender,
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
          { curp: { $regex: cleanSearch, $options: "i" } },
        ],
      }
    : null;

  const dateQuery = startDate
    ? { createdAt: { $gte: startDate, $lt: endDate } }
    : null;

  return {
    ...(status ? { status } : {}),
    ...(gender ? { gender } : {}),
    ...(textQuery ?? {}),
    ...(dateQuery ?? {}),
  };
};

export default {
  sanitize,
  searchingQuery,
};
