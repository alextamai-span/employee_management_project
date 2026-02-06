import { FastifyInstance } from 'fastify';
import { EmployeeController } from '../controllers/employee.controller';
import colors from 'console-log-colors'

export default async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/add',
    EmployeeController.addEmployee
  );

  fastify.put(
    '/update',
    EmployeeController.updateEmployee
  );

  fastify.get(
    '/list',
    EmployeeController.listEmployees
  );

  fastify.put(
    '/delete',
    EmployeeController.deleteEmployee
  );
}
