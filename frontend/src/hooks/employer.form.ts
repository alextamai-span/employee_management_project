import { useState } from "react";

export const useEmployerForm = () => {
  const [employerFormData, setEmployerFormData] = useState({
    employerCompanyName: "",
    employerContactPerson: "",
    employerEmail: "",
    employerPassword: "",
    employerConfirmPassword: "",
    employerPhoneNumber: ""
  });

  const [errors, setErrors] = useState<any>({});

  const handleEmployerChange = (e: any) => {
    const { name, value } = e.target;

    setEmployerFormData(prevState => ({
      ...prevState,
      [name === "companyName" ? "employerCompanyName" :
       name === "contactPerson" ? "employerContactPerson" :
       name === "email" ? "employerEmail" :
       name === "password" ? "employerPassword" :
       name === "confirmPassword" ? "employerConfirmPassword" :
       name === "phoneNumber" ? "employerPhoneNumber" : name]: value
    }));
  };

  return {
    employerFormData,
    setEmployerFormData,
    errors,
    setErrors,
    handleEmployerChange
  };
};
