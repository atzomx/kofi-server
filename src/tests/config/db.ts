import mongoose from "mongoose";
import mongodb from "@database";

async function start() {
  await mongodb.create();
}

async function finish() {
  await mongoose.disconnect();
}

export default { start, finish };
