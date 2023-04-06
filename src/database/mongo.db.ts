import { Log } from "@core/infrastructure/utils";
import mongoose from "mongoose";

export async function create() {
  const { MONGO_URL } = process.env;
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
