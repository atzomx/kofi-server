import dotenv from "dotenv";
import { Log } from "@core/infrastructure/utils";
import Migration from "../migrations";

dotenv.config();

async function create() {
  try {
    Log.i("Seeds creation started");
    await Migration.up();
    Log.s("Seeds creation successfully");
  } catch (err) {
    Log.e("Error: ", err);
  }
  process.exit();
}

create();
