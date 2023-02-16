import http from "http";
import PubSub from "@core/application/PubSub";
import TestUtils from "@core/infrastructure/utils/test.utils";
import authUtils from "@core/infrastructure/utils/token.utils";
import { Chat } from "@entities/chat";
import { Interaction } from "@entities/interactions";
import { Match } from "@entities/match";
import { Media } from "@entities/media";
import { Message } from "@entities/messages";
import { Notification } from "@entities/notifications";
import { User } from "@entities/users";
import { Verification } from "@entities/verifications";
import server from "../config";
import RedisPubSubMock from "../config/pubsub.mock";

jest.setTimeout(30000);

let app: http.Server;

let entities: {
  users: User[];
  chats: Chat[];
  messages: Message[];
  medias: Media[];
  verifications: Verification[];
  interactions: Interaction[];
  matchs: Match[];
  notifications: Notification[];
};

let authorization = "";
let authId = "";

beforeAll(async () => {
  //* WE MOCK REDIS PUBSUB */
  const pubSubMock = jest.spyOn(PubSub, "create");
  pubSubMock.mockImplementation(RedisPubSubMock.create);

  const initServer = await server.start();
  entities = initServer.entities;
  app = initServer.app;

  const user = TestUtils.getOneFromArray(entities.users);
  authId = user._id.toString();

  const userToken = authUtils.getToken(authId);
  authorization = `Token ${userToken}`;
});

afterAll(async () => {
  await server.stop();
});

export { app, entities, authorization, authId };
