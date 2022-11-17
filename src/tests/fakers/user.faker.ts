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

class UserFaker {
  static get() {
    const basic = UserFaker.basic();

    const complete: User = {
      ...basic,
      description: faker.lorem.paragraph(),
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
    const user: User = {
      name: faker.name.findName(),
      userName: faker.internet.userName(),
      birthday: faker.date.birthdate(),
      location: faker.address.country(),
      status: getEnumRandom(IUserStatus),
      password: faker.internet.password(),
    };
    return user;
  }
}

export default UserFaker;
