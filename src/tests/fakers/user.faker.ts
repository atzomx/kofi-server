import { faker } from "@faker-js/faker";
import TestUtils from "@core/infrastructure/utils/test.utils";
import { IUserGender, IUserStatus } from "@entities/users/domain/user.enums";
import User from "@entities/users/domain/user.entity";
import UserUtils from "@entities/users/application/user.utils";

class UserFaker {
  static get() {
    const userBasic = UserFaker.basic();
    const status = TestUtils.getEnumRandom(IUserStatus);
    const birthday = faker.date.birthdate();
    const user: User = { ...userBasic, status, birthday };

    const sanitized = UserUtils.sanitize({
      curp: user.curp,
      firstName: user.firstName,
      lastName: user.lastName,
      secondLastName: user.secondLastName,
    });

    return { ...user, ...sanitized };
  }

  static basic() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const secondLastName = faker.name.lastName();
    const baseUserName = `${firstName}${lastName}${secondLastName}`;

    const user = {
      firstName,
      lastName,
      secondLastName,
      birthday: faker.date.birthdate().toISOString(),
      curp: TestUtils.getCurp(),
      email: faker.internet.email(),
      gender: TestUtils.getEnumRandom(IUserGender),
      image: faker.internet.url(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number("+52##########"),
      userName: faker.internet.userName(baseUserName).substring(0, 16),
    };
    return user;
  }
}

export default UserFaker;
