import { Request, Response } from "express";
import { CompanyService } from "../services/company";

const companyService = new CompanyService();

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const company = await companyService.createCompany(name);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await companyService.getCompany(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const listCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyService.listCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { name } = req.body;
    const company = await companyService.updateCompany(companyId, name);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await companyService.deleteCompany(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
