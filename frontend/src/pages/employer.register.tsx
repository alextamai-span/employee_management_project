import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEmployerValidation } from "../hooks/employer.input.validation";
import { saveEmployerAccountToDB } from "../services/employer.service";

export default function EmployerRegister() {
  const navigate = useNavigate();
  
  // Form state
  const [employerFormData, setEmployerFormData] = useState({
    employerCompanyName: "",
    employerContactPerson: "",
    employerEmail: "",
    employerPassword: "",
    employerConfirmPassword: "",
    employerPhoneNumber: ""
  });

  const [errors, setErrors] = useState<any>({});

  // Validation hook
  const { validateEmployerForm } = useEmployerValidation(employerFormData, setErrors);

  // Change handler
  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployerFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleEmployerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = validateEmployerForm();

    if (!hasError) {
      try {
        const result = await saveEmployerAccountToDB(employerFormData);

        toast.success("Employer account created successfully!");
        toast.success("Go and login now!")
        navigate("/employer/login");


        setEmployerFormData({
          employerCompanyName: "",
          employerContactPerson: "",
          employerEmail: "",
          employerPassword: "",
          employerConfirmPassword: "",
          employerPhoneNumber: ""
        });
      }
      catch (error) {
        toast.error("Failed to create employer account!");
        console.error(error);
      }
    }
    else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="loginEmployer">
      <h2>Create Employer Account</h2>
      <p>Register as an employer to manage employees</p>

      <form id="employerForm" onSubmit={handleEmployerSubmit}>
        <div> {/* Contact Name */}
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="employerCompanyName"
            value={employerFormData.employerCompanyName}
            onChange={handleEmployerChange}
          />
          {errors.employerCompanyName && (
            <h4 className="form-invalid">{errors.employerCompanyName}</h4>
          )}
        </div>

        <div> {/* Contact Person */} 
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            name="employerContactPerson"
            value={employerFormData.employerContactPerson}
            onChange={handleEmployerChange}
          />
          {errors.employerContactPerson && ( <h4 className="form-invalid">{errors.employerContactPerson}</h4> )}
        </div>

        <div> {/* Email */}
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="employerEmail" 
            value={employerFormData.employerEmail}
            onChange={handleEmployerChange}
          />
          {errors.employerEmail && ( <h4 className="form-invalid">{errors.employerEmail}</h4> )}
        </div>

        <div> {/* Password */}
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            id="password"
            name="employerPassword"
            value={employerFormData.employerPassword}
            onChange={handleEmployerChange}
          />
          {errors.employerPassword && ( <h4 className="form-invalid">{errors.employerPassword}</h4> )}
        </div>

        <div> {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="employerConfirmPassword"
            value={employerFormData.employerConfirmPassword}
            onChange={handleEmployerChange}
            /> {errors.employerConfirmPassword && ( <h4 className="form-invalid"> {errors.employerConfirmPassword} </h4> )}
          </div>

        <div> {/* Phone Number */} 
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="employerPhoneNumber"
            value={employerFormData.employerPhoneNumber}
            onChange={handleEmployerChange}
          />
          {errors.employerPhoneNumber && ( <h4 className="form-invalid">{errors.employerPhoneNumber}</h4> )}
        </div>

        <button type="submit" className="logInBtn">Create Account</button>
      </form>

      <p>Already have an account?</p>
      <Link to="/employer/login" className="logInBtn">Sign In</Link>
    </div>
  );
}
