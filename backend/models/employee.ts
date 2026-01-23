export interface Employee {
  id: number;
  employer_id: string;
  name: string;
  ssn: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  created_at: string;
  updated_at?: string | null;
  is_deleted: boolean;
}