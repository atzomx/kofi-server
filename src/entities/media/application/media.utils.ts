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
  const textQuery = {
    $or: [
      { normalizedFullName: { $regex: cleanSearch, $options: "i" } },
      { email: { $regex: cleanSearch, $options: "i" } },
      { phoneNumber: { $regex: cleanSearch, $options: "i" } },
      { userName: { $regex: cleanSearch, $options: "i" } },
    ],
  };

  const dateQuery = { createdAt: { $gte: startDate, $lt: endDate } };
  return {
    ...(cleanSearch ? textQuery : {}),
    ...(startDate ? dateQuery : {}),
  };
};

export default {
  searchingQuery,
};
