import mongodb from "@database";
import mongoose from "mongoose";

async function start() {
  await mongodb.create();
}

async function finish() {
  await mongoose.disconnect();
}

export default { start, finish };
