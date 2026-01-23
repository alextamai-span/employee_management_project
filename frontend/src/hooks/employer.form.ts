import { useState } from "react";
import { EmployerFormData, EmployerFormErrors } from "../types/employer.types";

export const useEmployerForm = () => {
  // Initial state for the form
  const [employerFormData, setEmployerFormData] = useState<EmployerFormData>({
    employerCompanyName: "",
    employerContactPerson: "",
    employerEmail: "",
    employerPassword: "",
    employerConfirmPassword: "",
    employerPhoneNumber: "",
  });
  // Initial state for errors
  const [errors, setErrors] = useState<EmployerFormErrors>({});

  
  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployerFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the specific error for this field as the user types
    if (errors[name as keyof EmployerFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return {
    employerFormData,
    setEmployerFormData,
    errors,
    setErrors,
    handleEmployerChange,
  };
};