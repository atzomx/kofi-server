import "reflect-metadata";

import dotenv from "dotenv";
import mongodb from "@database";
import server from "@server";

dotenv.config();
mongodb.start();
server.start();
