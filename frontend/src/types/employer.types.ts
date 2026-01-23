// creating a new employer account
export interface EmployerFormData {
  employerCompanyName: string;
  employerContactPerson: string;
  employerEmail: string;
  employerPassword: string;
  employerConfirmPassword: string;
  employerPhoneNumber: string;
}

// errors from the new employer creation
export interface EmployerFormErrors {
  employerCompanyName?: string;
  employerContactPerson?: string;
  employerEmail?: string;
  employerPassword?: string;
  employerConfirmPassword?: string;
  employerPhoneNumber?: string;
}

export interface EmployerProfile {
  id: number; 
  employerCompanyName: string;
  employerEmail: string;
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Props for login component
export interface EmployerLoginProps {
  // Pick selects the inputs that are relevant for the log in
  employerFormData: Pick<EmployerFormData, 'employerEmail' | 'employerPassword'>; // Only login fields
  errors: Pick<EmployerFormErrors, 'employerEmail' | 'employerPassword'>; // Only login errors
  
  handleLogInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogInSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface AddEmployeeProps {
  employerFormData: EmployerFormData;
  errors: EmployerFormErrors;
  handleEmployerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmployerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}