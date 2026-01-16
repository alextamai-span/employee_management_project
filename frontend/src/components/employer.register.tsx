import React from "react";
import '../App.css'
import { toast } from "react-toastify";
import { EmployerFormData, EmployerFormErrors } from "../types/employer.types";

interface Props {
  employerFormData: EmployerFormData;
  errors: EmployerFormErrors;
  handleEmployerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmployerSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setShowCreateEmployerAccount: (v: boolean) => void;
}

export default function EmployerRegister({
  employerFormData,
  errors,
  handleEmployerChange,
  handleEmployerSubmit,
  setShowCreateEmployerAccount
}: Props) {
  return (
    <div className="createEmployerAccount">
      <h2>Create Employer Account</h2>
      <p>Register as an employer to manage employees</p>

      <form id="employerForm" onSubmit={handleEmployerSubmit}>
        <div>
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

        <div>
          <label htmlFor="contactPerson">Contact Person:</label>
          <input
            type="text"
            id="contactPerson"
            name="employerContactPerson"
            value={employerFormData.employerContactPerson}
            onChange={handleEmployerChange}
          />
          {errors.employerContactPerson && (
            <h4 className="form-invalid">{errors.employerContactPerson}</h4>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="employerEmail"
            value={employerFormData.employerEmail}
            onChange={handleEmployerChange}
          />
          {errors.employerEmail && (
            <h4 className="form-invalid">{errors.employerEmail}</h4>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="employerPassword"
            value={employerFormData.employerPassword}
            onChange={handleEmployerChange}
          />
          {errors.employerPassword && (
            <h4 className="form-invalid">{errors.employerPassword}</h4>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="employerConfirmPassword"
            value={employerFormData.employerConfirmPassword}
            onChange={handleEmployerChange}
          />
          {errors.employerConfirmPassword && (
            <h4 className="form-invalid">
              {errors.employerConfirmPassword}
            </h4>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="employerPhoneNumber"
            value={employerFormData.employerPhoneNumber}
            onChange={handleEmployerChange}
          />
          {errors.employerPhoneNumber && (
            <h4 className="form-invalid">{errors.employerPhoneNumber}</h4>
          )}
        </div>

        <button type="submit" className="signInBtn"> Create Account</button>
      </form>
    </div>
  );
}
