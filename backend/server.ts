import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import bcrypt from 'bcrypt';

const fastify = Fastify({ logger: true });
// PostgreSQL
fastify.register(fastifyPostgres, {
  connectionString: 'postgres://postgres:Wrestling22!@localhost:4194/employee_mgt',
});

// CORS
fastify.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// JWT
fastify.register(fastifyJwt, {
  secret: 'super-secret-key-change-this',
});

// server is found and online
fastify.get('/', async (request, reply) => {
  console.log('Server is online');
  reply.status(200).send('Server is online');
});

// create tables if tables do not exist
const employerTableQuery = `
  CREATE TABLE IF NOT EXISTS employers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT FALSE
  )`;

const employeeTableQuery = `
  CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    employer_id INT REFERENCES employers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    ssn TEXT UNIQUE NOT NULL,
    address1 TEXT,
    address2 TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT FALSE 
  )`;

// ensure tables are created when server starts
fastify.ready().then(async () => {
  const client = await fastify.pg.connect();

  try {
    await client.query(employerTableQuery);
    fastify.log.info('Employer table created or already exists.');

    await client.query(employeeTableQuery);
    fastify.log.info('Employee table created or already exists.');
  }
  catch (err) {
    fastify.log.error('Error creating tables');
  }
  finally {
    client.release();
  }
});

// store all employers
fastify.post('/employers/add', async (request, reply) => {
  const {
    employerCompanyName,
    employerContactPerson,
    employerEmail,
    employerPassword,
  } = request.body as any;

  // get connection
  const client = await fastify.pg.connect();

  try {
    const passwordHash = await bcrypt.hash(employerPassword, 10);

    const sql = `INSERT INTO
      employers (name, email, password_hash)
      VALUES ($1, $2, $3)`;

    const addNewEmployer = await client.query(
      sql,
      [
        employerCompanyName || employerContactPerson,
        employerEmail,
        passwordHash,
      ]
    );

    const createdTest = addNewEmployer.rows[1];
    console.log(createdTest);

    reply.status(201).send({
      message: 'Employer account created successfully!',
    });
  }
  catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ message: 'Failed to create employer' });
  }
  finally {
    client.release();
  }
});

import { color, log, red, green, cyan, cyanBright } from 'console-log-colors';
// employers log in
fastify.post('/employers/login', async (request, reply) => {
  const { employerEmail, employerPassword } = request.body as any;

  const client = await fastify.pg.connect();

  try {
    const sql = `SELECT id, email, password_hash
      FROM employers
      WHERE email = $1
      AND is_deleted = FALSE`;

    // does the email exist
    const checkDatabase = await client.query(sql, [employerEmail]);

    // does the password match
    const employer = checkDatabase.rows[0]; // 0 for only 1 unique email

    console.log(color.red('employer: '), employer)

    if (!employer) {
      throw new Error('Failed to find employer in database'); 
    }

    const isMatch = await bcrypt.compare(
      // comparing inputted log in to database
      employerPassword,
      employer.password_hash
    );
    // password invalid
    if (!isMatch) {
      return reply.status(401).send({ message: 'Invalid password' });
    }
    console.log(color.red('ismatch: '), isMatch)

    // succuessful login 
    const token = fastify.jwt.sign(
      {
        id: employer.id,
        email: employer.email,
      },
      { expiresIn: '1h' }
    );

    reply.send({
      message: 'Login successful',
      token,
    });
  }
  catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ message: 'Login failed' });
  }
  finally {
    client.release();
  }
});

// list all employers
fastify.get('/employers/list', async (request, reply) => {
  const client = await fastify.pg.connect();
  
  try {
    const { rows } = await client.query('SELECT * FROM employers');
    reply.status(200).send(rows);
  } 
  catch (err) {
    fastify.log.error(err);
    reply.status(500).send('Error retrieving employers');
  }
  finally {
    client.release();
  }
});

// list all employees
fastify.get('/employees', async (request, reply) => {
  const client = await fastify.pg.connect();

  try {
    const { rows } = await client.query('SELECT * FROM employees');
    reply.status(200).send(rows);
  }
  catch (err) {
    fastify.log.error(err);
    reply.status(500).send('Error retrieving employees');
  }
  finally {
    client.release();
  }
});

// start and listen on port 5000
const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    console.log('listening in progress');
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
// export { db }