import http from "http";
import { IContext } from "@core/domain/interfaces";
import { AuthGuard } from "@entities/auth";
import { GraphQLSchema } from "graphql";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";

const create = async (httpServer: http.Server, schema: GraphQLSchema) => {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const server = useServer<IContext>(
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

  return server;
};

export default { create };
