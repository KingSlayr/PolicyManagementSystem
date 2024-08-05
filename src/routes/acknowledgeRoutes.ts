import { Router } from "express";
import {
  getAcknowledgementsForEmployee,
  updateAcknowledgementStatus,
  sendPeriodicRequests,
} from "../controllers/acknowledgementController";

const router = Router();

router.get("/employee/:employeeId", getAcknowledgementsForEmployee);
router.patch("/:acknowledgeId", updateAcknowledgementStatus);
router.post("/periodic", sendPeriodicRequests);

export default router;
