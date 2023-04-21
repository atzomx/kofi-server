import IndexMigrate from "../tests/migrations";
import { Log } from "@core/infrastructure/utils";
import dotenv from "dotenv";

dotenv.config();

async function create() {
  try {
    await IndexMigrate.up();
    Log.i("Seeds created successfully");
  } catch (err) {
    Log.e("Error: ", err);
  }
  process.exit();
}

create();
