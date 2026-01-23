export interface Employer {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at?: string | null;
  is_deleted: boolean;
}