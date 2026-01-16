import dotenv from 'dotenv';

// stroing environmental variables

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:Wrestling22!@localhost:4194/employee_mgt',
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-key-change-this',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};
