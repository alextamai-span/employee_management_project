
// Validation function
export const useEmployeeValidation = (
  data: any,
  setErrors: (errors: any) => void
  ) => {
  const validateEmployeeForm = () => {
    const newErrors: any = {};
    let hasError = false;

    // Employee Name validation
    const EmployeeNameRegex = /^[A-Za-z\s]{2,50}$/;
    if (!data.name.trim()) {
        newErrors.name = 'Employee Name is required.';
        hasError = true;
    }
    else if (!EmployeeNameRegex.test(data.name)) {
        newErrors.name = 'Employee Name must be 2-50 characters long and contain only letters and spaces.';
        hasError = true;
    }
    else {
        newErrors.name = '';
    }

    // ssn validation
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!data.ssn.trim()) {
        newErrors.ssn = 'Employee SSN is required.';
        hasError = true;
    }
    else if (!ssnRegex.test(data.ssn)) {
        newErrors.ssn = 'Employee SSN is not valid.';
        hasError = true;
    }
    else {
        newErrors.ssn = '';
    }

    // address1 validation
    if (!data.address1.trim()) {
        newErrors.address1 = 'Employee Address1 is required.';
        hasError = true;
    }
    else if (data.address1.length < 8) {
        newErrors.address1 = 'Employee Address1 must be at least 8 characters long.';
        hasError = true;
    }
    else {
        newErrors.address1 = '';
    }

    // city validation
    if (!data.city.trim()) {
        newErrors.city = 'Employee City is required.';
        hasError = true;
    }
    else {
        newErrors.city = '';
    }

    // Zip validation
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!data.zip.trim()) {
        newErrors.zip = 'Employee Zip is required.';
        hasError = true;
    }
    else if (!zipRegex.test(data.zip)) {
        newErrors.zip = 'Employee Zip is not valid.';
        hasError = true;
    }
    else {
        newErrors.zip = '';
    }

    // Country validation
    if (!data.country || data.country === 'Select Country') {
        newErrors.country = 'Employee Country is required.';
        hasError = true;
    }
    else if (data.country === 'United States') {
        // State validation
        if (!data.state || data.state === 'Select State') {
            newErrors.state = 'Employee State is required.';
            hasError = true;
        }
        else {
            newErrors.state = '';
        }
    }
    else if (data.country !== 'United States') {
        data.state = 'Not in United States';
    }
    else {
        newErrors.country = '';
    }

    setErrors(newErrors);
    return hasError;
  };

  return { validateEmployeeForm };
};

