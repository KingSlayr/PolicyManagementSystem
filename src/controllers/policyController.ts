import { Request, Response } from "express";
import { PolicyService } from "../services/policyService";

const policyService = new PolicyService();

export const createPolicy = async (req: Request, res: Response) => {
  try {
    const { companyId, content, periodForAcknowledge } = req.body;
    const policy = await policyService.createPolicy(
      companyId,
      content,
      periodForAcknowledge
    );
    res.status(201).json(policy);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const getPolicy = async (req: Request, res: Response) => {
  try {
    const { policyId } = req.params;
    const policy = await policyService.getPolicy(policyId);
    if (policy) {
      res.status(200).json(policy);
    } else {
      res.status(404).json({ message: "Policy not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const listPolicies = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const policies = await policyService.listPolicies(companyId);
    res.status(200).json(policies);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const createPolicyFromTemplate = async (req: Request, res: Response) => {
  try {
    const { templateId, companyId, periodForAcknowledge } = req.body;
    const policy = await policyService.createPolicyFromTemplate(
      templateId,
      companyId,
      periodForAcknowledge
    );
    res.status(201).json(policy);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
