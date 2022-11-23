const getInteractionExpiration = (): Date => {
  const { INTERACTION_EXPIRED_TIME } = process.env;
  const DAYS_EXPIRED = Number(INTERACTION_EXPIRED_TIME) ?? 60;
  const today = new Date();
  today.setDate(today.getDate() + DAYS_EXPIRED);
  return today;
};

export default { getInteractionExpiration };
