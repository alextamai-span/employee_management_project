export interface Employee {
  id: string;
  employer_id: string;
  name: string;
  ssn: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface EmployeeFormData extends Omit<Employee, 'id'> {}

export interface EmployeeFormErrors {
  [key: string]: string | undefined;
}