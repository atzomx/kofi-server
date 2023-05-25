import mongoose from "mongoose";
import { Log } from "@core/infrastructure/utils";

export async function create() {
  const { MONGO_URL } = process.env;
  const connection = await mongoose.connect(MONGO_URL!);
  return connection;
}

async function start() {
  const { MONGO_URL } = process.env;
  try {
    await create();
    Log.i(`Database connected at ${MONGO_URL}`);
  } catch (error) {
    Log.e(`Error to connect database ${MONGO_URL}`);
  }
}

export default { start, create };
