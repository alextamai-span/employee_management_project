import { FastifyInstance } from "fastify";
import { logData } from "../models/log";
import { insertLog } from "../db/loggerQuery";

export const logApiRequest = async (
  fastify: FastifyInstance,
  logData: logData
) => {
  try {
    await fastify.pg.query(
      insertLog,
      [
        logData.method,
        logData.endpoint,
        // stringifying to keep the request together in an object
        logData.queryParams ? JSON.stringify(logData.queryParams) : null,
        logData.requestBody ? JSON.stringify(logData.requestBody) : null,
        logData.responseStatus || null,
        logData.responseBody ? JSON.stringify(logData.responseBody) : null,
        logData.clientIp || null,
        logData.userAgent || null,
        logData.executionTimeMs || null,
        logData.errorMessage || null
      ]
    );
  }
  catch (err) {
    console.error("Failed to log API request:", err);
  }
};
