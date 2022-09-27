import bcrypt from "bcrypt";

const SALT = 12;

export const encrypt = (password: string) => bcrypt.hashSync(password, SALT);

export const compare = (hashedPassword: string, plainPassword: string) =>
  bcrypt.compareSync(plainPassword, hashedPassword);

export default { encrypt, compare };
