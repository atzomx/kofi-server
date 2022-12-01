import { Types } from "mongoose";
import { ObjectIdScalar } from "./ObjectIdScalar";

export const GLOBAL_SCALARS = [
  { type: Types.ObjectId, scalar: ObjectIdScalar },
];

export default { GLOBAL_SCALARS };
