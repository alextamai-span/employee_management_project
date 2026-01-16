// Form data for creating or logging in an employer account
export interface EmployerFormData {
  employerCompanyName: string;
  employerContactPerson: string;
  employerEmail: string;
  employerPassword: string;
  employerConfirmPassword: string;
  employerPhoneNumber: string;
}

// Errors for employer form fields (all optional)
export interface EmployerFormErrors {
  employerCompanyName?: string;
  employerContactPerson?: string;
  employerEmail?: string;
  employerPassword?: string;
  employerConfirmPassword?: string;
  employerPhoneNumber?: string;
}

// Props for EmployerLogin component
export interface EmployerLoginProps {
  // Pick selects the inputs that are relevant for the log in
  employerFormData: Pick<EmployerFormData, 'employerEmail' | 'employerPassword'>; // Only login fields
  errors: Pick<EmployerFormErrors, 'employerEmail' | 'employerPassword'>; // Only login errors
  
  handleLogInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogInSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowCreateEmployerAccount: (v: boolean) => void;
  setShowLogIn: (v: boolean) => void;
}
