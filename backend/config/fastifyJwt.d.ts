import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: {
      // employerId in JWT
      id: string;
      email?: string;
    };
    user: {
      // user object after jwtVerify()
      id: string;      
      email?: string;
    };
  }
}
