import { FastifyInstance } from 'fastify';
import { EmployeeController } from '../controllers/employee.controller';
import { verifyJWT } from '../middlewares/jwt.auth';

async function logRequest(request: any, reply: any) {
  request.log.info(`Verified JWT for ${request.method} ${request.url}`);
}

export default async function employeeRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/add',
    { preHandler: [verifyJWT, logRequest] },
    EmployeeController.addEmployee
  );

  fastify.put(
    '/update',
    { preHandler: [verifyJWT, logRequest] },
    EmployeeController.updateEmployee
  );

  fastify.get(
    '/list',
    { preHandler: [verifyJWT, logRequest] },
    EmployeeController.listEmployees
  );

  fastify.put(
    '/delete',
    { preHandler: [verifyJWT, logRequest] },
    EmployeeController.deleteEmployee
  );
}
