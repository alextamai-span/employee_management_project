import { FastifyInstance } from 'fastify';
import { EmployeeRepository } from '../repositories/employee.repository';
import { Employee } from '../models/employee';
import colors from 'console-log-colors'

export const EmployeeService = (fastify: FastifyInstance) => {
  const repo = EmployeeRepository(fastify);

  return {
    // create a new employee
    async addEmployee(employeeData: Omit<Employee, 'employeeId'>): Promise<Employee> {
      return repo.createEmployee(employeeData);
    },

    async updateEmployee(employeeId: any, employeeData: Employee): Promise<Employee> {
      return repo.updateEmployee(employeeId, employeeData);
    },

    // listing all employees
    async getAllEmployees(): Promise<Employee[]> {
      return await repo.listAllEmployees();
    },

    async deleteEmployee(employeeId: any): Promise<Employee> {
      return await repo.deleteEmployee(employeeId);
    }
  };
};