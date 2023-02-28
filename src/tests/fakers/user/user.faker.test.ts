import "reflect-metadata";
import UserFaker from "./user.faker";

const keysOptionals = ["status", "role"];

const keysRequired = ["name", "email", "password"];

describe("User faker", () => {
  it("Should return a user random", () => {
    const user = UserFaker.get();
    [...keysRequired, ...keysOptionals].forEach((key) => {
      expect(user).toHaveProperty(key);
    });
  });

  it("Should return a basic user random", () => {
    const user = UserFaker.basic();
    keysRequired.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
  });
});
