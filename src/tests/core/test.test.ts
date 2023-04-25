import TestUtils, {
  getRandomNumber,
  getRandomChar,
} from "@core/infrastructure/utils/test.utils";

const MAX_TEST = 50;

const A_LOWER = 97;
const Z_LOWER = 122;

describe("Enum utils", () => {
  it("Should return a random number value", () => {
    const min = 50;
    const max = 99;
    for (let i = 0; i < MAX_TEST; i++) {
      const result = getRandomNumber(max, min);
      const valid = result >= min && result <= max;
      expect(valid).toBeTruthy();
    }
  });

  it("Should return a random enum value", () => {
    enum IUserGender {
      "male" = "male",
      "female" = "female",
      "other" = "other",
    }

    const values = Object.values(IUserGender);
    for (let i = 0; i < MAX_TEST; i++) {
      const result = TestUtils.getEnumRandom(IUserGender);
      expect(values.includes(result)).toBeTruthy();
    }
  });

  it("Should return a random char value", () => {
    for (let i = 0; i < MAX_TEST; i++) {
      const result = getRandomChar();
      const char = result.charCodeAt(0);
      const valid = char >= A_LOWER && char <= Z_LOWER;
      expect(valid).toBeTruthy();
    }
  });
});
