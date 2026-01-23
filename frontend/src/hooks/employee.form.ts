import { useState } from "react";
import { EmployeeFormData, EmployeeFormErrors } from "../types/employee.types";

export const useEmployeeForm = () => {
  // Initial state for the form
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>({
    // employer_id: "",
    name: "",
    ssn: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  // Initial state for errors
  const [errors, setErrors] = useState<EmployeeFormErrors>({});

  const handleEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployeeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the specific error for this field as the user types
    if (errors[name as keyof EmployeeFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return {
    employeeFormData,
    setEmployeeFormData,
    errors,
    setErrors,
    handleEmployeeChange,
  };
};