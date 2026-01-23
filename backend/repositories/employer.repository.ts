import { FastifyInstance } from 'fastify';
import { Employer } from '../models/employer';
import { newEmployer, employerLogin, employerList } from '../db/query';

export const EmployerRepository = (fastify: FastifyInstance) => ({
  // create employer
  async createEmployer(
    name: string,
    email: string,
    passwordHash: string
  ): Promise<Employer> {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        newEmployer,
        [name, email, passwordHash]
      );

      return rows[0];
    }
    finally {
      client.release();
    }
  },

  // Find employer by email (for login)
  async findByEmail(email: string): Promise<Employer | null> {
    const { rows } = await fastify.pg.query(
      employerLogin,
      [email]
    );

    return rows[0] || null;
  },

  // listing all employers
  async listAllEmployers(): Promise<Employer[]> {
    const { rows } = await fastify.pg.query(
      employerList
    );

    return rows;
  }
});
