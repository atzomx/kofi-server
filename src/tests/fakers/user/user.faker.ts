/* eslint-disable no-unused-vars */
import {
  getEnumRandom,
  getManyFromArray,
} from "@core/infrastructure/utils/test.utils";
import User from "@entities/users/domain/user.entity";
import {
  IUserDegree,
  IUserInterests,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserSexualOrientation,
  IUserStatus,
} from "@entities/users/domain/user.enums";
import { faker } from "@faker-js/faker";

export const DEFAULT_PASSWORD = "123456.hello";

class UserFaker {
  static create() {
    const { status, ...complete } = UserFaker.get();
    return complete;
  }

  static get() {
    const basic = UserFaker.basic();

    const description = faker.lorem.paragraph(1).substring(0, 200);

    const complete: User = {
      ...basic,
      description,
      interest: getManyFromArray(Object.values(IUserInterests), 5),
      personality: getEnumRandom(IUserPersonality),
      maritalStatus: getEnumRandom(IUserMaritalStatus),
      lookingFor: getEnumRandom(IUserLookingFor),
      employer: faker.company.companyName(),
      pets: getEnumRandom(IUserPets),
      sexualOrientation: getEnumRandom(IUserSexualOrientation),
      degree: getEnumRandom(IUserDegree),
      religion: getEnumRandom(IUserReligion),
      nacionality: faker.address.country(),
    };

    return complete;
  }

  static basic() {
    const name = faker.name.findName();
    const userFirst = faker.internet.userName(name);
    const userSecond = faker.internet.userName(name);
    const userName = `${userFirst}${userSecond}`.substring(0, 16);

    const user: User = {
      name,
      userName,
      email: faker.internet.email(userFirst, userSecond),
      birthday: faker.date.birthdate(),
      location: faker.address.country().substring(0, 30),
      status: getEnumRandom(IUserStatus),
      password: DEFAULT_PASSWORD,
    };
    return user;
  }
}

export default UserFaker;
