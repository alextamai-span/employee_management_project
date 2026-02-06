import { FastifyRequest, FastifyReply } from 'fastify';
import { EmployerService } from '../services/employer.service';
import colors from 'console-log-colors'

// receive requests and respond to them
export const EmployerController = {
  // add an employer
  async addEmployer(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployerService(request.server);
    
    try {
      const employerData = request.body as any;
      const newEmployer = await service.registerEmployer(employerData);

      return reply.status(201).send({
        message: 'Employer account created successfully!',
        data: newEmployer
      });
    }
    catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({ message: 'Failed to create employer' });
    }
  },

  // login
  async login(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployerService(request.server);

    try {
      const { employerEmail, employerPassword } = request.body as any;
      const employer = await service.loginEmployer(employerEmail, employerPassword);

      // create JWT token with employer id and email, expires in 1 hour
      const token = request.server.jwt.sign(
        { 
          id: employer.id,
          email: employer.email
        },
        { expiresIn: '1h' }
      );

      // send the token and employer id back to the client (frontend - services/employer.service)
      return reply.send({
        message: 'Login successful',
        employerId: employer.id,
        token: token,
      });

    }
    catch (err: any) {
      request.log.error(err);
      return reply.status(401).send({ message: 'Login failed' });
    }
  },

  // list employers
  async listEmployers(request: FastifyRequest, reply: FastifyReply) {
    const service = EmployerService(request.server);
    
    try {
      const rows = await service.getAllEmployers();

      return reply.status(200).send(rows);
    }
    catch (err) {
      return reply.status(500).send('Error retrieving employers');
    }
  }
};