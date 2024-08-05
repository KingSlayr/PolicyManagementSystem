import Company from "../models/company";

export class CompanyService {
  async createCompany(name: string) {
    const company = new Company({ name });
    await company.save();
    return company;
  }

  async getCompany(companyId: string) {
    return Company.findById(companyId);
  }

  async listCompanies() {
    return Company.find();
  }

  async updateCompany(companyId: string, name: string) {
    return Company.findByIdAndUpdate(companyId, { name }, { new: true });
  }

  async deleteCompany(companyId: string) {
    return Company.findByIdAndDelete(companyId);
  }
}
