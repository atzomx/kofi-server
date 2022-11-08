import { Log } from "@core/infrastructure/utils";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export async function create() {
  let { MONGO_URL } = process.env;

  if (process.env.NODE_ENV === "test") {
    const mongod = await MongoMemoryServer.create();
    MONGO_URL = mongod.getUri();
  }

  const connection = await mongoose.connect(MONGO_URL!);
  return connection;
}

async function start() {
  try {
    const { MONGO_URL } = process.env;
    await create();
    Log.i(`Database connected at ${MONGO_URL}`);
  } catch (error) {
    Log.e("Error to connect database");
  }
}

export default { start, create };
