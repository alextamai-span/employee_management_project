import { FastifyInstance } from 'fastify';
import { EmployerController } from '../controllers/employer.controller';

export default async function employerRoutes(fastify: FastifyInstance) {
  fastify.post('/register', EmployerController.addEmployer);
  fastify.post('/login', EmployerController.login);
  fastify.get('/list', EmployerController.listEmployers);
}