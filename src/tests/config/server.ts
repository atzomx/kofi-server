import { ApolloServer, ExpressContext } from "apollo-server-express";
import { create } from "@server/apollo.server";
import http from "http";

let server: {
  server: ApolloServer<ExpressContext>;
  app: http.Server;
};

async function start() {
  server = await create(6000, __dirname);
  return server;
}

async function stop() {
  const { app: appServer, server: gqlServer } = server;
  await new Promise((resolve, reject) => {
    appServer.close((err) => (!err ? resolve(null) : reject()));
  });
  await gqlServer.stop();
}

export default { start, stop };
