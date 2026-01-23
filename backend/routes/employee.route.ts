import { FastifyInstance } from 'fastify';
import { EmployeeController } from '../controllers/employee.controller';

export default async function employeeRoutes(fastify: FastifyInstance) {
  // Protect all routes with JWT authentication
  fastify.post(
    '/add',
    EmployeeController.addEmployee
  );

  fastify.get(
    '/list',
    EmployeeController.listEmployees
  );
}
