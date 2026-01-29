export interface logData {
    method: string;
    endpoint: string;
    queryParams?: any;
    requestBody?: any;
    responseStatus?: number;
    responseBody?: any;
    clientIp?: string;
    userAgent?: string;
    executionTimeMs?: number;
    errorMessage?: string;
  }