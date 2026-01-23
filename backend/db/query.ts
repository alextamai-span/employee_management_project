export const employeeTableQuery = `
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

export const employerTableQuery = `
  CREATE TABLE IF NOT EXISTS employers (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,
    is_deleted BOOLEAN DEFAULT FALSE
  )`;

export const newEmployer = `
  INSERT INTO employers (name, email, password_hash)
  VALUES ($1, $2, $3)`;

export const employerLogin = `
  SELECT * FROM employers 
  WHERE email = $1 AND is_deleted = FALSE`;

export const employerList = `
  SELECT * FROM employers 
  WHERE is_deleted = FALSE 
  ORDER BY created_at DESC`;

export const addEmployee = `
  INSERT INTO employees 
  (employer_id, name, ssn, address1, address2,
    city, state, zip, country)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

export const employeeList = `
  SELECT * FROM employees 
  WHERE employer_id = $1 
  ORDER BY created_at DESC`;
