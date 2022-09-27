import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import migrations from "../migrations";
import server from "./server";

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
  await migrations.down();
  await server.stop();
};

export default { start, stop };
