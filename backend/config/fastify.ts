import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';

// Fastify instance and register plugins

export const buildFastify = () => {
  const fastify = Fastify({ logger: true });

  // PostgreSQL
  fastify.register(fastifyPostgres, {
    connectionString: env.DATABASE_URL,
  });

  // CORS
  fastify.register(fastifyCors, {
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // JWT
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  return fastify;
};
