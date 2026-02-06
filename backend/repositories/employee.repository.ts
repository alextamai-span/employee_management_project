import { FastifyInstance } from 'fastify';
import { Employee } from '../models/employee';
import { addEmployee, updateEmployee, employeeList, deleteEmployeeFromList } from '../db/query';
import colors from 'console-log-colors'

export const EmployeeRepository = (fastify: FastifyInstance) => ({
  // add a new employee
  async createEmployee(data: Omit<Employee, "employeeId">): Promise<Employee> {
    try {
      const { rows } = await fastify.pg.query(
        addEmployee,
        [
          data.employer_id, data.name, data.ssn, 
          data.address1, data.address2, data.city,  
          data.state, data.zip, data.country
        ]
      );
      return rows[0];
    }
    catch(error) {
      console.error('Failed to add employee to the DB');
      throw new Error('Failed to add employee to DB');
    }
  },
  
  async updateEmployee(employeeId: any, data: Employee): Promise<Employee> {
    try {
      const { rows } = await fastify.pg.query(
        updateEmployee, 
        [
          data.employer_id, data.name, data.ssn, data.address1, 
          data.address2, data.city, data.state, 
          data.zip, data.country, employeeId
        ]
      );

      if (rows.length === 0) {
        throw new Error('Employee not found');
      }

      return rows[0];
    }
    catch (error) {
      console.error('Failed to update employee in the DB', error);
      throw new Error('Failed to update employee in DB');
    }
  },

  // listing all employees
  async listAllEmployees(): Promise<Employee[]> {
    try {
      const { rows } = await fastify.pg.query(
        employeeList
      );
      
      return rows;
    }
    catch (error) {
      console.error('Failed to list employee in the DB', error);
      throw new Error('Failed to list employee in DB');
    }
  },

  async deleteEmployee(employeeId: any): Promise<Employee> {
    console.log(colors.red('id'), employeeId)
    try {
      const row = await fastify.pg.query(
        deleteEmployeeFromList,
        [employeeId]
      );

      if (row.rowCount === 0) {
        // No employee was deleted
        throw new Error('Employee not found');
      }

      return row.rows[0];
    }
    catch (error) {
      console.error('Failed to delete employee from the DB', error);
      throw new Error('Failed to delete employee from DB');
    }
  }

});