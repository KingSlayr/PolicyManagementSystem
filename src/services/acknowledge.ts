import { INITIAL_ACKNOWLEDGE, PERIODIC_ACKNOWLEDGE } from "../constant";
import Acknowledge from "../models/acknowledge";
import Employee from "../models/employee";
import Policy from "../models/policy";
import moment from "moment";

export class AcknowledgementService {
  async createAcknowledgement(
    employeeId: string,
    policyId: string,
    type: string
  ) {
    const policy = await Policy.findById(policyId);
    if (!policy) throw new Error("Policy not found");
    const currentDate = new Date();
    const expiryDate = moment(currentDate)
      .add(policy.periodForAcknowledge, "days")
      .toDate();

    const acknowledgement = new Acknowledge({
      employee_id: employeeId,
      policy_id: policyId,
      initiated_date: currentDate,
      expiry_date: expiryDate,
      is_fulfilled: false,
      type: type,
    });

    await acknowledgement.save();

    policy.lastTimeAcknowledged = currentDate;
    await policy.save();

    return acknowledgement;
  }

  async getAcknowledgementsForEmployee(employeeId: string) {
    return Acknowledge.find({ employee_id: employeeId });
  }

  async updateAcknowledgementStatus(acknowledgeId: string, status: boolean) {
    const acknowledgement = await Acknowledge.findById(acknowledgeId);
    if (acknowledgement) {
      acknowledgement.is_fulfilled = status;
      await acknowledgement.save();
    }
    return acknowledgement;
  }

  async sendAcknowledgementRequests(companyId: string) {
    const employees = await Employee.find({ company_id: companyId });
    const policies = await Policy.find({ company_id: companyId });

    for (const employee of employees) {
      for (const policy of policies) {
        await this.createAcknowledgement(
          employee.id,
          policy.id,
          INITIAL_ACKNOWLEDGE
        );
      }
    }
  }

  async createAcknowledgementsForPolicy(policyId: string) {
    const policy = await Policy.findById(policyId);
    if (!policy) throw new Error("Policy not found");

    const employees = await Employee.find({
      policies: policyId,
    });

    const acknowledgements = employees.map((employee) =>
      this.createAcknowledgement(
        employee._id.toString(),
        policyId,
        PERIODIC_ACKNOWLEDGE
      )
    );

    await Promise.all(acknowledgements);
    return acknowledgements;
  }

  async sendPeriodicRequests(companyId: string) {
    const today = new Date();
    const startOfToday = moment(today).startOf("day").toDate();

    const policies = await Policy.find({ company_id: companyId });

    if (policies.length === 0) {
      console.log("No policies found for the company.");
      return;
    }

    for (const policy of policies) {
      const periodForAcknowledge = policy.periodForAcknowledge;
      const lastTimeAcknowledged = moment(policy.lastTimeAcknowledged)
        .startOf("day")
        .toDate();
      const targetDate = moment(lastTimeAcknowledged)
        .add(periodForAcknowledge, "days")
        .toDate();

      if (moment(startOfToday).isSame(targetDate, "day")) {
        await this.createAcknowledgementsForPolicy(policy._id);
      }
    }
  }
}
