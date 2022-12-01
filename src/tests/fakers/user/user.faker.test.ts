import "reflect-metadata";
import UserFaker from "./user.faker";

const keysOptionals = [
  "description",
  "interest",
  "personality",
  "maritalStatus",
  "lookingFor",
  "employer",
  "pets",
  "sexualOrientation",
  "degree",
  "religion",
  "nacionality",
];

const keysRequired = [
  "name",
  "userName",
  "birthday",
  "location",
  "status",
  "password",
];

describe("User faker", () => {
  it("Should return a user random", () => {
    const user = UserFaker.get();
    [...keysRequired, ...keysOptionals].forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("userName");
    expect(user.birthday).toBeInstanceOf(Date);
  });

  it("Should return a basic user random", () => {
    const user = UserFaker.basic();
    keysRequired.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    expect(user).not.toHaveProperty("normalizedFullName");
  });
});
