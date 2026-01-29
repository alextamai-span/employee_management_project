import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { logApiRequest } from "../middlewares/logger";
import { logData } from "../models/log";

export const requestLogger = (fastify: FastifyInstance) => {
  // Hook before the request starts
  fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
    (request as any).startTime = Date.now();
  });

  // Hook after the response is sent
  fastify.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    const startTime = (request as any).startTime || Date.now();
    const executionTime = Date.now() - startTime;

    const log: logData = {
      method: request.method,
      endpoint: request.url,
      queryParams: request.query,
      requestBody: request.body,
      responseStatus: reply.statusCode,
      responseBody: null,
      clientIp: request.ip,
      userAgent: request.headers["user-agent"],
      executionTimeMs: executionTime,
      errorMessage: undefined,
    };

    await logApiRequest(fastify, log);
  });

  // Hook if an error occurs
  fastify.addHook("onError", async (request: FastifyRequest, reply: FastifyReply, error: Error) => {
    const startTime = (request as any).startTime || Date.now();
    const executionTime = Date.now() - startTime;

    const log: logData = {
      method: request.method,
      endpoint: request.url,
      queryParams: request.query,
      requestBody: request.body,
      responseStatus: reply.statusCode,
      responseBody: null,
      clientIp: request.ip,
      userAgent: request.headers["user-agent"],
      executionTimeMs: executionTime,
      errorMessage: error.message,
    };

    await logApiRequest(fastify, log);
  });
};
