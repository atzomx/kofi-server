/* eslint-disable @typescript-eslint/ban-types */
import { uniq, take } from "lodash";

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

export const getOneFromArray = <T extends {}>(array: Array<T>) => {
  return array[getRandomNumber(array.length)];
};

export const notInArray = (a: string[], b: string[]) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

export const getManyFromArray = <T extends {}>(
  array: Array<T>,
  size: number,
) => {
  return Array.from({ length: size }).map(() => getOneFromArray(array));
};

export const getManyFromArrayUnique = <T extends {}>(
  array: Array<T>,
  size: number,
) => {
  return take(uniq(array), size);
};

export default {
  getEnumRandom,
  getManyFromArray,
  getOneFromArray,
  getManyFromArrayUnique,
};
