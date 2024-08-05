import { Router } from "express";
import {
  createPolicy,
  createPolicyFromTemplate,
  getPolicy,
  listPolicies,
} from "../controllers/policyController";

const router = Router();

router.post("/", createPolicy);
router.get("/:policyId", getPolicy);
router.get("/company/:companyId", listPolicies);
router.post("/from-template", createPolicyFromTemplate);


export default router;
