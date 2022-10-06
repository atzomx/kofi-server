import "reflect-metadata";

import mongodb from "@database";
import server from "@server";
import dotenv from "dotenv";

dotenv.config();
mongodb.start();
server.start();
