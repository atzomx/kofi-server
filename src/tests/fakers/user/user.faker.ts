/* eslint-disable no-unused-vars */
import { getEnumRandom } from "@core/infrastructure/utils/test.utils";
import User from "@entities/users/domain/user.entity";
import { IUserRole, IUserStatus } from "@entities/users/domain/user.enums";
import { faker } from "@faker-js/faker";

export const DEFAULT_PASSWORD = "123456.hello";

class UserFaker {
  static create() {
    const { status, ...complete } = UserFaker.get();
    return complete;
  }

  static get() {
    const basic = UserFaker.basic();
    const complete: User = {
      ...basic,
      status: getEnumRandom(IUserStatus),
      role: getEnumRandom(IUserRole),
    };

    return complete;
  }

  static basic() {
    const name = faker.name.findName();
    const userFirst = faker.internet.userName(faker.name.findName());
    const userSecond = faker.internet.userName(faker.name.findName());

    const user = {
      name,
      email: faker.internet.email(userFirst, userSecond),
      password: DEFAULT_PASSWORD,
    };
    return user;
  }
}

export default UserFaker;
