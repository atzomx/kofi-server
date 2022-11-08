import { Types } from "mongoose";
import Message from "../message.entity";

export type IMessageExtra = Message & { destinatary: Types.ObjectId };
