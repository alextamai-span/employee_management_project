import { EmployerFormData, EmployerFormErrors } from "../types/employer.types";

// Validation function
export const useEmployerLogInValidation = (
  data: Pick<EmployerFormData, "employerEmail" | "employerPassword">,
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
    // ---- need to add validating with database -----
    else {
        newErrors.employerPassword = '';
    }

    setErrors(newErrors);
    return hasError;
  };

  return { validateEmployerLogIn };
};