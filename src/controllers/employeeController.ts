import { Request, Response } from "express";
import { EmployeeService } from "../services/employeeService";

const employeeService = new EmployeeService();

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { name, companyId } = req.body;
    const employee = await employeeService.addEmployee(name, companyId);
    res.status(201).json(employee);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const employee = await employeeService.getEmployee(employeeId);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getEmployeesByCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const employees = await employeeService.getEmployeesByCompany(companyId);
    res.status(200).json(employees);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
