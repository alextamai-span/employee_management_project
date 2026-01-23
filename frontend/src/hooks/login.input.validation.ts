import { EmployerFormErrors } from "../types/employer.types";

interface LoginFields {
  employerEmail: string;
  employerPassword: string;
}

// Validation function
export const useEmployerLogInValidation = (
  data: LoginFields,
  setErrors: (errors: Pick<EmployerFormErrors, "employerEmail" | "employerPassword">) => void
) => {
  const validateEmployerLogIn = (): boolean => {
    const newErrors: Pick<EmployerFormErrors, "employerEmail" | "employerPassword"> = {};
    let hasError = false;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.employerEmail.trim()) {
        newErrors.employerEmail = 'Email is required.';
        hasError = true;
    }
    else if (!emailRegex.test(data.employerEmail)) {
        newErrors.employerEmail = 'Email is not valid.';
        hasError = true;
    }
    else {
        newErrors.employerEmail = '';
    }

    // Password validation
    if (!data.employerPassword) {
        newErrors.employerPassword = 'Password is required.';
        hasError = true;
    }
    else if (data.employerPassword.length < 8) {
        newErrors.employerPassword = 'Password must be at least 8 characters long.';
        hasError = true;
    }
    else {
        newErrors.employerPassword = '';
    }

    setErrors(newErrors);
    return hasError;
  };

  return { validateEmployerLogIn };
};