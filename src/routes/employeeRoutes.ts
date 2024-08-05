import { Router } from "express";
import {
  addEmployee,
  getEmployee,
  getEmployeesByCompany,
} from "../controllers/employeeController";

const router = Router();

router.post("/", addEmployee);
router.get("/:employeeId", getEmployee);
router.get("/company/:companyId", getEmployeesByCompany);

export default router;
