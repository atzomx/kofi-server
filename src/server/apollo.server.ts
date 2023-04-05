import http from "http";
import * as path from "path";
import PubSub from "@core/application/PubSub";
import { UserContext } from "@core/infrastructure/context";
import { GLOBAL_SCALARS } from "@core/infrastructure/scalars";
import { Log } from "@core/infrastructure/utils";
import Entities from "@entities";
import { AuthChecker } from "@entities/auth";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import SocketServer from "./socket.server";

export async function create(port: number, dir = __dirname) {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: Entities.resolvers,
    emitSchemaFile: path.resolve(dir, "schema.gql"),
    scalarsMap: GLOBAL_SCALARS,
    pubSub: PubSub.create(),
    authChecker: AuthChecker,
  });

  const socketServer = await SocketServer.create(httpServer, schema);

  const server = new ApolloServer({
    debug: false,
    schema,
    introspection: process.env.NODE_ENV !== "production",
    context: UserContext,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await socketServer.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve, reject) => {
    httpServer
      .listen(port)
      .once("listening", () => resolve(httpServer))
      .once("error", reject);
  });
  return { server, app: httpServer };
}

async function start() {
  try {
    const PORT = Number(process.env.PORT ?? 4000);
    await create(PORT);
    Log.i(`Server is ready at http://localhost:${PORT}/graphql`);
  } catch (err) {
    Log.e("Error starting the node server", err);
  }
}

export default { start };
