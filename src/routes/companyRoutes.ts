import { Router } from "express";
import {
  createCompany,
  getCompany,
  listCompanies,
  updateCompany,
  deleteCompany,
} from "../controllers/comapnyController";

const router = Router();

router.post("/", createCompany);
router.get("/:companyId", getCompany);
router.get("/", listCompanies);
router.put("/:companyId", updateCompany);
router.delete("/:companyId", deleteCompany);

export default router;
