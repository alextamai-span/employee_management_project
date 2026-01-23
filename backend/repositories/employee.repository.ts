import { FastifyInstance } from 'fastify';
import { Employee } from '../models/employee';
import { addEmployee, employeeList } from '../db/query';
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
  
  // listing all employees
  async listAllEmployees(employerId: any): Promise<Employee[]> {
    const { rows } = await fastify.pg.query(
      employeeList,
      [employerId]
    );
    console.log(colors.red("DONE DB WITH:"), rows);
    
    return rows;
  }
});