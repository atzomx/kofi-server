import { Sanitizer } from "@core/infrastructure/utils";

type TSeaching = {
    search?: string;
    endDate?: Date;
    startDate?: Date;
  };

const searchingQuery = ({
  search = "",
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
    ...(textQuery ?? {}),
    ...(dateQuery ?? {}),
  };
};

export default {
  searchingQuery,
};