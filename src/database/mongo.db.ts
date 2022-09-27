import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Log } from "@core/infrastructure/utils";

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
    await create();
    Log.i("Database connected");
  } catch (error) {
    Log.e("Error to connect database");
  }
}

export default { start, create };
