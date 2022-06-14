const ParentRepository = require("../Repositories/ParentRepository");
const EmployeeRepository = require("../Repositories/EmployeeRepository");
const { isEmpty, userExist } = require("../utility/utility");
const {injectToDI}=require("../decorators/decorators")

@injectToDI('EmployeeSrv')
class EmployeeSrv {
  static instance

  async add(id, data, parentId) {
    // Check if employeeId is already exist
    const employee = await EmployeeRepository.getEmployeeData(id);
    if (userExist(employee)) {
      return employee;
    }
    // employee does not exist
    const result = await Promise.all([
      EmployeeRepository.insertEmployeeData(id, data),
      ParentRepository.insertParentAndEmployeeIds(id, parentId),
    ]);
    return result;
  }

  async get(id) {
    const result = await Promise.all([
      EmployeeRepository.getEmployeeData(id),
      ParentRepository.getParentId(id),
    ]);
    return {
      data: result[0],
      parentId: result[1],
    };
  }

  async update(id, data, parentId) {
    // Check if employeeId is exist
    const employee = await EmployeeRepository.getEmployeeData(id);
    if (!userExist(employee)) {
      return employee;
    }
    const result = await Promise.all([
      EmployeeRepository.insertEmployeeData(id, data),
      ParentRepository.insertParentAndEmployeeIds(id, parentId),
    ]);
    return result;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    return (this.instance = new EmployeeSrv());
  }
}

module.exports = EmployeeSrv;
