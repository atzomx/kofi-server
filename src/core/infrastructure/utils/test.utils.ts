/* eslint-disable @typescript-eslint/ban-types */
export const getRandomNumber = (max: number, min = 0) => {
  const rand = Math.floor(Math.random() * (max - min)) + min;
  return rand;
};

export const getEnumRandom = <TEnum extends object>(enumObj: TEnum) => {
  const values = Object.values(enumObj);
  const position = getRandomNumber(values.length);
  return values[position];
};

export const getRandomChar = () => {
  const value = getRandomNumber(26);
  const character = String.fromCharCode(value + 97);
  return character;
};

export const getByFormat = (format: string) => {
  let acum = "";
  for (let i = 0; i < format.length; i++) {
    const letter = format[i];
    if (letter === "S") acum += getRandomChar();
    else if (letter === "#") acum += getRandomNumber(9);
    else throw Error("Invalid format");
  }
  return acum;
};

export const getCurp = () => {
  return getByFormat("SSSS######SSSSSS##");
};

export const getOneFromArray = <T extends {}>(array: Array<T>) => {
  return array[getRandomNumber(array.length)];
};

export default { getEnumRandom, getByFormat, getCurp, getOneFromArray };
