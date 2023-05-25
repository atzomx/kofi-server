import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";
import server from "./server";
import migrations from "../migrations";

const file = path.join(__dirname, "../../../", ".env.example");

dotenv.config({
  path: file,
});

export const start = async () => {
  const entities = await migrations.up();
  const { app, server: gqlServer } = await server.start();

  return { entities, app, gqlServer };
};

export const stop = async () => {
  await server.stop();
  await migrations.down();
};

export default { start, stop };
