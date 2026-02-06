import { FastifyInstance } from 'fastify';
import { EmployerRepository } from '../repositories/employer.repository';
import { hashPassword, comparePassword } from '../utils/authenticate';

export const EmployerService = (fastify: FastifyInstance) => {
  const repo = EmployerRepository(fastify);

  return {
    // create a new employer
    async registerEmployer(payload: any) {
      // hash password
      const hashed = await hashPassword(payload.employerPassword);
      
      return await repo.createEmployer(payload.employerCompanyName, payload.employerEmail, hashed);
    },

    // log in for employer
    async loginEmployer(email: string, pass: string) {
      const employer = await repo.findByEmail(email);

      if (!employer) {
        throw new Error('Invalid email or password');
      }

      // hash compare
      const isMatch = await comparePassword(pass, employer.password_hash);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      return { 
        id: employer.id,
        email: employer.email 
      };
    },

    // listing all employers
    async getAllEmployers() {
      return await repo.listAllEmployers();
    }
  };
};