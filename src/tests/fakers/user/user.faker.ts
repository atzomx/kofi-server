/* eslint-disable no-unused-vars */
import {
  getEnumRandom,
  getRandomNumber,
} from "@core/infrastructure/utils/test.utils";
import { Media } from "@entities/media";
import {
  UserInformation,
  UserPreference,
} from "@entities/users/domain/object-types";
import User from "@entities/users/domain/user.entity";
import {
  IUserDegree,
  IUserInterests,
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
      distance: {
        min: getRandomNumber(1, 50),
        max: getRandomNumber(50, 200),
      },
    } as UserPreference;
  }

  static getInformation(_medias: Media[], update = false) {
    const mediasId = _medias.map(({ _id }) => _id.toString());
    const medias = faker.helpers.arrayElements(mediasId, 3);

    return {
      location: {
        ...(!update ? { type: "Point" } : {}),
        coordinates: [+faker.address.longitude(), +faker.address.latitude()],
      },
      birthday: faker.date.birthdate(),
      degree: getEnumRandom(IUserDegree),
      description: faker.lorem.paragraph(),
      employer: faker.company.companyName(),
      interest: getEnumRandom(IUserInterests),
      lookingFor: getEnumRandom(IUserLookingFor),
      maritalStatus: getEnumRandom(IUserMaritalStatus),
      nacionality: faker.address.countryCode(),
      personality: getEnumRandom(IUserPersonality),
      pets: getEnumRandom(IUserPets),
      religion: getEnumRandom(IUserReligion),
      sexualOrientation: getEnumRandom(IUserSexualOrientation),
      medias,
    };
  }

  static get(role = IUserRole.LOVER, medias: Media[] = []) {
    const basic = UserFaker.basic();

    const preferences =
      role === IUserRole.LOVER ? UserFaker.getPreferences() : null;
    const information =
      role === IUserRole.LOVER ? UserFaker.getInformation(medias) : null;
    const complete: User = {
      ...basic,
      status: IUserStatus.active,
      role,
      preferences,
      information: information as UserInformation,
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
