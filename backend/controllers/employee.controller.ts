import { FastifyRequest, FastifyReply } from 'fastify';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import colors from 'console-log-colors'

// receive requests and respond to them
export const EmployeeController = {
  // add an employee
  async addEmployee(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployeeService(request.server);

    try {
      const employeeData = request.body as Omit<Employee, "employeeId">;

      const newEmployee = await service.addEmployee({
        ...employeeData
      });

      return reply.status(201).send({
        message: 'Employee account created successfully!',
        data: newEmployee
      });
    }
    catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({ message: 'Failed to create employee' });
    }
  },

  async updateEmployee(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployeeService(request.server);

    try {
      const { employeeId } = request.query as { employeeId: any};
      const employeeData = request.body as Omit<Employee, "employer_id">;

      const updatedEmployee = await service.updateEmployee(employeeId, employeeData);

      return reply.status(200).send({
        message: 'Employee updated successfully!',
        data: updatedEmployee
      });
    }
    catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({ message: 'Failed to update employee' });
    }
  },

  // list employees
  async listEmployees(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployeeService(request.server);

    try {
      const rows = await service.getAllEmployees();
      return reply.status(200).send(rows);
    }
    catch (err) {
      return reply.status(500).send('Error retrieving employees');
    }
  },

  async deleteEmployee(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployeeService(request.server);
  
    try {
      const { employeeId } = request.query as { employeeId?: any };
      const deleted = await service.deleteEmployee(employeeId);

      if (!deleted) {
        return reply.status(404).send({ message: 'Employee not found' });
      }

      return reply.status(200).send({
        message: 'Employee deleted successfully!',
        employeeId
      });
    } 
    catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({ message: 'Failed to delete employee' });
    }
  }

};