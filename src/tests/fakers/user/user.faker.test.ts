import "reflect-metadata";
import { IUserRole } from "@entities/users/domain/user.enums";
import UserFaker from "./user.faker";

const keysOptionals = ["status", "role"];
const keysRequired = ["name", "email", "password"];

describe("User faker", () => {
  it("Should return a user random", () => {
    const user = UserFaker.get();
    [...keysRequired, ...keysOptionals].forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    if (user.role === IUserRole.LOVER) {
      expect(user).toHaveProperty("information");
      expect(user).toHaveProperty("preferences");
    }
  });

  it("Should return a basic user random", () => {
    const user = UserFaker.basic();
    keysRequired.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
  });
});
