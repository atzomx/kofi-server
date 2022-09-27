import * as path from "path";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import Entities from "@entities";
import { Log } from "@core/infrastructure/utils";
import { buildSchema } from "type-graphql";
import express from "express";
import http from "http";

export async function create(port: number, dir = __dirname) {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: Entities.resolvers,
    emitSchemaFile: path.resolve(dir, "schema.gql"),
    validate: true,
  });

  const server = new ApolloServer({
    debug: false,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => ({ req, res }),
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
    Log.i("Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    Log.e("Error starting the node server", err);
  }
}

export default { start };
