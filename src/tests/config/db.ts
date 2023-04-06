import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function start() {
  const mongodb = await MongoMemoryServer.create();
  const MONGO_URL = mongodb.getUri();
  await mongoose.connect(MONGO_URL);
}

async function finish() {
  await mongoose.connection.close();
  await mongoose.disconnect();
}

export default { start, finish };
