import { buildFastify } from './config/fastify.js';
import { env } from './config/env.js';
import colors from 'console-log-colors'

// create tables if tables do not exist
import { employerTableQuery, employeeTableQuery } from './db/query.js'
import { loggerQuery } from './db/loggerQuery.js';

// import routes
import employerRoutes from './routes/employer.route'
import employeeRoutes from './routes/employee.route'
import { requestLogger } from './plugins/requestLogger.js';

// Fastify build
const fastify = buildFastify();

// connect and initialize employer/employee database tables
const initializeDatabase = async () => {
  try {
    const client = await fastify.pg.connect();

    try {
      await client.query(employerTableQuery);
      await client.query(employeeTableQuery);
      await client.query(loggerQuery);
      fastify.log.info('Database tables initialized');
    }
    catch (err) {
      fastify.log.error('Failed to initialize database tables');
      process.exit(1);
    }
  }
  catch (err) {
    fastify.log.error('Failed to connect to database');
    process.exit(1);
  }
};

// start 
const start = async () => {
  try {
    // start logging
    requestLogger(fastify); 

    // check for server
    fastify.get('/', async () => ({ status: 'online' }));

    // create routes for employer/employee
    await fastify.register(employerRoutes, { prefix: '/employers' });
    await fastify.register(employeeRoutes, { prefix: '/employees' });

    // start up plug ins
    await fastify.ready();
    // start up database
    await initializeDatabase();

    
    // listen on port 5000
    await fastify.listen({ port: 5000 });
    console.log(`Server listening at http://localhost:${env.PORT}`);
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();