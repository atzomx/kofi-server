import http from "http";
import PubSub from "@core/application/PubSub";
import authUtils from "@core/infrastructure/utils/token.utils";
import { Chat } from "@entities/chat";
import { Interaction } from "@entities/interactions";
import { Match } from "@entities/match";
import { Media } from "@entities/media";
import { Message } from "@entities/messages";
import { Notification } from "@entities/notifications";
import { User } from "@entities/users";
import { IUserRole } from "@entities/users/domain/user.enums";
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

const authorization = {
  LOVER: "",
  ADMIN: "",
  MODERATOR: "",
};

const users = {
  LOVER: {} as User,
  ADMIN: {} as User,
  MODERATOR: {} as User,
};

beforeAll(async () => {
  //* WE MOCK REDIS PUBSUB */
  const pubSubMock = jest.spyOn(PubSub, "create");
  pubSubMock.mockImplementation(RedisPubSubMock.create);

  const initServer = await server.start();
  entities = initServer.entities;
  app = initServer.app;

  const userLover = entities.users.find(({ role }) => role === IUserRole.LOVER);
  const userLoverToken = authUtils.getToken(userLover._id.toString());
  authorization.LOVER = `Token ${userLoverToken}`;
  users.LOVER = userLover;

  const userAdmin = entities.users.find(({ role }) => role === IUserRole.ADMIN);
  const userAdminToken = authUtils.getToken(userAdmin._id.toString());
  authorization.ADMIN = `Token ${userAdminToken}`;
  users.ADMIN = userAdmin;

  const userModerator = entities.users.find(
    ({ role }) => role === IUserRole.ADMIN,
  );
  const userModeratorToken = authUtils.getToken(userModerator._id.toString());
  authorization.MODERATOR = `Token ${userModeratorToken}`;
  users.MODERATOR = userModerator;
});

afterAll(async () => {
  await server.stop();
});

export { app, entities, authorization, users };
