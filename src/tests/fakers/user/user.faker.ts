/* eslint-disable no-unused-vars */
import {
  getEnumRandom,
  getRandomNumber,
} from "@core/infrastructure/utils/test.utils";
import User, { UserPreference } from "@entities/users/domain/user.entity";
import {
  IUserDegree,
  IUserLookingFor,
  IUserMaritalStatus,
  IUserPersonality,
  IUserPets,
  IUserReligion,
  IUserRole,
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

  static getPreferences() {
    return {
      personality: getEnumRandom(IUserPersonality),
      maritalStatus: getEnumRandom(IUserMaritalStatus),
      lookingFor: getEnumRandom(IUserLookingFor),
      pets: getEnumRandom(IUserPets),
      sexualPreference: getEnumRandom(IUserSexualOrientation),
      degree: getEnumRandom(IUserDegree),
      religion: getEnumRandom(IUserReligion),
      ageRange: {
        min: getRandomNumber(18, 30),
        max: getRandomNumber(31, 90),
      },
    } as UserPreference;
  }

  static get(role = IUserRole.LOVER) {
    const basic = UserFaker.basic();
    const preferences =
      role === IUserRole.LOVER ? UserFaker.getPreferences() : null;
    const complete: User = {
      ...basic,
      status: IUserStatus.active,
      role,
      preferences,
    };

    return complete;
  }

  static basic() {
    const name = faker.name.findName();
    const userFirst = faker.internet.userName(faker.name.findName());
    const userSecond = faker.internet.userName(faker.name.findName());
    const email = faker.internet.email(userFirst, userSecond);
    const password = DEFAULT_PASSWORD;

    const user = { name, email, password };
    return user;
  }
}

export default UserFaker;
