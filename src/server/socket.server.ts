import http from "http";
import { IContext } from "@core/domain/interfaces";
import { Log } from "@core/infrastructure/utils";
import { AuthGuard } from "@entities/auth";
import { GraphQLSchema } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const create = async (httpServer: http.Server, schema: GraphQLSchema) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const server = useServer(
    {
      schema,
      context: (ctx: IContext) => ctx,
      onSubscribe: async (ctx): Promise<void> => {
        await AuthGuard.socket(ctx);
      },
      onNext: async (ctx): Promise<void> => {
        await AuthGuard.socket(ctx);
      },
    },
    wsServer,
  );

  wsServer.addListener("listening", () => {
    Log.i("Server Socket is ready to subscriptions");
  });
  wsServer.addListener("error", () => {
    Log.e("Server Socket error to create");
  });

  return server;
};

export default { create };
