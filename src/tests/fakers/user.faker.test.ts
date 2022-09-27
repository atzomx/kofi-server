import "reflect-metadata";
import UserFaker from "./user.faker";

const keysMandatories = [
  "birthday",
  "firstName",
  "lastName",
  "secondLastName",
  "email",
  "userName",
  "phoneNumber",
  "password",
  "gender",
  "curp",
];

describe("User faker", () => {
  it("Should return a user random", () => {
    const user = UserFaker.get();
    keysMandatories.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    expect(user).toHaveProperty("normalizedFullName");
    expect(user).toHaveProperty("status");
    expect(user.birthday).toBeInstanceOf(Date);
  });

  it("Should return a basic user random", () => {
    const user = UserFaker.basic();
    keysMandatories.forEach((key) => {
      expect(user).toHaveProperty(key);
    });
    expect(user).not.toHaveProperty("normalizedFullName");
  });
});
