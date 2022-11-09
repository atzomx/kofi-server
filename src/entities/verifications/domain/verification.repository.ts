import { Repository } from "@core/domain";
import Verification from "./verification.entity";
import VerificationModel from "./verification.model";

class VerificationRepository extends Repository<Verification> {
  constructor() {
    super(VerificationModel);
  }
}

export default VerificationRepository;
