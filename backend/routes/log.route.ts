import { FastifyInstance } from "fastify";
import { getLogs } from "../db/loggerQuery";
import colors from 'console-log-colors'

export default async function logRoutes(fastify: FastifyInstance) {

  console.log(colors.red('log route'))
  
  fastify.get("/logs", async () => {
    const { rows } = await fastify.pg.query(getLogs);

    return rows;
  });
}
