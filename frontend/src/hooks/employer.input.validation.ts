
// Validation function
export const useEmployerValidation = (
  data: any,
  setErrors: (errors: any) => void
  ) => {
  const validateEmployerForm = () => {
    const newErrors: any = {};
    let hasError = false;

    // Company Name validation
    if (!data.employerCompanyName.trim()) {
        newErrors.employerCompanyName = "Company Name is required.";
        hasError = true;
    }
    else if (data.employerCompanyName.length < 2 || data.employerCompanyName.length > 50) {
        newErrors.employerCompanyName = 'Company Name must be 2-50 characters long.';
        hasError = true;
    }
    else {
        newErrors.employerCompanyName = '';
    }

    // Contact Person validation
    const contactPersonRegex = /^[A-Za-z\s]{2,50}$/;
    if (!data.employerContactPerson.trim()) {
        newErrors.employerContactPerson = 'Contact Person is required.';
        hasError = true;
    }
    else if (!contactPersonRegex.test(data.employerContactPerson)) {
        newErrors.employerContactPerson = 'Contact Person must be 2-50 characters long and contain only letters and spaces.';
        hasError = true;
    }
    else {
        newErrors.employerContactPerson = '';
    }

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

    // Confirm Password validation
    if (!data.employerConfirmPassword) {
        newErrors.employerConfirmPassword = 'Confirm Password is required.';
        hasError = true;
    }
    else if (data.employerConfirmPassword !== data.employerPassword) {
        newErrors.employerConfirmPassword = 'Passwords do not match.';
        hasError = true;
    }
    else {
        newErrors.employerConfirmPassword = '';
    }

    // Phone validation
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!data.employerPhoneNumber.trim()) {
        newErrors.employerPhoneNumber = 'Phone is required.';
        hasError = true;
    }
    else if (!phoneRegex.test(data.employerPhoneNumber)) {
        newErrors.employerPhoneNumber = 'Phone number is not valid';
        hasError = true;
    }
    else {
        newErrors.employerPhoneNumber = '';
    }

    setErrors(newErrors);
    return hasError;
  };

  return { validateEmployerForm };
};

