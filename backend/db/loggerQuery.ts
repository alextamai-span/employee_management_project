export const loggerQuery = `
  CREATE TABLE IF NOT EXISTS api_request_logs (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    method TEXT,
    endpoint TEXT,
    query_params JSONB,
    request_body JSONB, 
    response_status INT,
    response_body JSONB,
    client_ip TEXT,
    user_agent TEXT,
    execution_time_ms INT,
    error_message TEXT
  )`;

export const insertLog = `
  INSERT INTO api_request_logs (
    method, endpoint, query_params, request_body, 
    response_status, response_body, client_ip, 
    user_agent, execution_time_ms, error_message
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`;

export const getLogs = `
  SELECT *
  FROM api_request_logs
  LIMIT 100`;