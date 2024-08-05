import { Request, Response } from "express";
import { AcknowledgementService } from "../services/acknowledge";
import { INITIAL_ACKNOWLEDGE } from "../constant";

const acknowledgementService = new AcknowledgementService();

export const getAcknowledgementsForEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { employeeId } = req.params;
    const acknowledgements =
      await acknowledgementService.getAcknowledgementsForEmployee(employeeId);
    res.status(200).json(acknowledgements);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const updateAcknowledgementStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { acknowledgeId } = req.params;
    const { status } = req.body;
    const acknowledgement =
      await acknowledgementService.updateAcknowledgementStatus(
        acknowledgeId,
        status
      );
    if (acknowledgement) {
      res.status(200).json(acknowledgement);
    } else {
      res.status(404).json({ message: "Acknowledgement not found" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const sendPeriodicRequests = async (req: Request, res: Response) => {
  try {
    const { company_id } = req.body;
    await acknowledgementService.sendPeriodicRequests(company_id);
    res.status(200).json({ message: "Periodic requests sent successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
