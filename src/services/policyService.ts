import Policy from "../models/policy";
import Template from "../models/template";
import PolicyVerification from "../models/policyVerification";
import Employee from "../models/employee";

export class PolicyService {
  async createPolicy(
    companyId: string,
    content: string,
    periodForAcknowledge: number
  ) {
    const template = new Template({
      content,
    });
    await template.save();

    const policy = new Policy({
      periodForAcknowledge,
      company_id: companyId,
      template_id: template.id,
      is_verified: false,
    });
    await policy.save();

    const verifiers = await Employee.find({
      company_id: companyId,
      is_verifier: true,
    });

    const verificationRequests = verifiers.map((verifier) => {
      const verificationRequest = new PolicyVerification({
        policy_id: policy.id,
        verifier_id: verifier.id,
        verification_date: new Date(),
        is_verified: false,
      });
      return verificationRequest.save();
    });

    await Promise.all(verificationRequests);

    await this.notifyVerifiers(
      verifiers.map((verifier) => verifier.id),
      policy.id
    );

    return policy;
  }

  async getPolicy(policyId: string) {
    return Policy.findById(policyId);
  }

  async listPolicies(companyId: string) {
    return Policy.find({ company_id: companyId });
  }

  private async notifyVerifiers(verifierIds: string[], policyId: string) {
    console.log(
      `Notification sent to verifiers ${verifierIds.join(
        ", "
      )} for policy ${policyId}`
    );
  }

  async createPolicyFromTemplate(
    templateId: string,
    companyId: string,
    periodForAcknowledge: number
  ) {
    const template = await Template.findById(templateId);
    if (!template) throw new Error("Template not found");

    const policy = new Policy({
      company_id: companyId,
      template_id: template._id,
      is_verified: false,
      periodForAcknowledge,
    });
    await policy.save();

    const verifiers = await Employee.find({
      company_id: companyId,
      is_verifier: true,
    });

    const verificationRequests = verifiers.map((verifier) => {
      const verificationRequest = new PolicyVerification({
        policy_id: policy._id,
        verifier_id: verifier._id,
        verification_date: new Date(),
        is_verified: false,
      });
      return verificationRequest.save();
    });

    await Promise.all(verificationRequests);

    await this.notifyVerifiers(
      verifiers.map((verifier) => verifier._id.toString()),
      policy._id.toString()
    );

    return policy;
  }
}
