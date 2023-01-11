import http from "http";
import logger from "@core/infrastructure/utils/logger.utils";
import TestUtils from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { User } from "@entities/users";
import { Verification } from "@entities/verifications";
import server from "../config";

jest.setTimeout(10000);

let app: http.Server;

let entities: {
  users: User[];
  verifications: Verification[];
};

let authorization = "";

beforeAll(async () => {
  try {
    const initServer = await server.start();
    entities = initServer.entities;
    app = initServer.app;

    const user = TestUtils.getOneFromArray(entities.users);
    const userId = user._id.toString();

    const userToken = authUtils.getToken(userId);
    authorization = `Token ${userToken}`;
  } catch ({ message }) {
    logger.e(message as string);
  }
});

afterAll(async () => {
  try {
    await server.stop();
  } catch ({ message }) {
    logger.e(message as string);
  }
});

export { app, entities, authorization };
