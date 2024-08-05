import Employee from "../models/employee";

export class EmployeeService {
  async addEmployee(name: string, companyId: string) {
    const employee = new Employee({
      name,
      company_id: companyId,
    });
    await employee.save();
    return employee;
  }

  async getEmployee(employeeId: string) {
    return Employee.findById(employeeId);
  }

  async getEmployeesByCompany(companyId: string) {
    return Employee.find({ company_id: companyId });
  }
}
