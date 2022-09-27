const DEFAULT_LIMIT = 15;

type LimitType = {
  page?: number;
  limit?: number;
};

export const getSkip = ({ page = 0, limit = DEFAULT_LIMIT }: LimitType) => {
  if (limit < 0) return 0;
  return page > 0 ? (page - 1) * limit : 0;
};

export default {
  getSkip,
};
