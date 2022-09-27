import jwt from "jsonwebtoken";

const getExpiration = (): number => {
  const { JWT_EXPIRED_TIME } = process.env;
  const DAYS_EXPIRED = Number(JWT_EXPIRED_TIME) ?? 60;
  const today = new Date();
  today.setDate(today.getDate() + DAYS_EXPIRED);
  return today.getTime() / 1000;
};

export const getToken = (id: string) => {
  const { JWT_SECRET } = process.env;
  const token = jwt.sign({ id, exp: getExpiration() }, JWT_SECRET);
  return token;
};

export const verify = (token: string) => {
  const { JWT_SECRET } = process.env;
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};

export default { getToken, verify };
