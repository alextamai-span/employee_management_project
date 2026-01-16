import { FastifyInstance } from 'fastify';
import { Employer } from '../models/employer';

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
        `INSERT INTO employers (name, email, password_hash)
         VALUES ($1, $2, $3)`,
        [name, email, passwordHash]
      );

      return rows[0];
    }
    finally {
      client.release();
    }
  },

  // find employer with email
  async findByEmail(email: string): Promise<Employer | null> {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        `SELECT * FROM employers WHERE email = $1 AND is_deleted = FALSE`,
        [email]
      );

      return rows[0] || null;
    }
    finally {
      client.release();
    }
  },

  // list all employers
  async listAll(): Promise<Employer[]> {
    const client = await fastify.pg.connect();

    try {
      const { rows } = await client.query(
        `SELECT id, name, email, created_at FROM employers WHERE is_deleted = FALSE`
      );

      return rows;
    }
    finally {
      client.release();
    }
  },
});
