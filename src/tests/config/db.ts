import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function start() {
  let { MONGO_URL } = process.env;

  if (process.env.NODE_ENV === "test") {
    const mongod = await MongoMemoryServer.create();
    MONGO_URL = mongod.getUri();
  }
  
  await mongoose.connect(MONGO_URL);
}

async function finish() {
  await mongoose.connection.close();
  await mongoose.disconnect();
}

export default { start, finish };
