import React from "react";
import '../App.css'
import { EmployerLoginProps } from "../types/employer.types";

export default function EmployerLogin({
  employerFormData,
  errors,
  handleLogInChange,
  handleLogInSubmit,
  setShowCreateEmployerAccount,
  setShowLogIn
}: EmployerLoginProps) {

  return (
    <div className="logInPage">
      <h2>Please Provide Login Credentials</h2>

      <form id="logInForm" onSubmit={handleLogInSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="employerEmail"
            value={employerFormData.employerEmail}
            onChange={handleLogInChange}
          />
          {errors.employerEmail && (
            <h4 className="form-invalid">{errors.employerEmail}</h4>
          )}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="employerPassword"
            value={employerFormData.employerPassword}
            onChange={handleLogInChange}
          />
          {errors.employerPassword && (
            <h4 className="form-invalid">{errors.employerPassword}</h4>
          )}
        </div>

        <button type="submit" className="logInBtn">Sign In</button>
      </form>

      <label htmlFor="alreadyHaveAccount">Already have an account?</label>
      <button
        type="button"
        className="logInBtn"
        onClick={() => {
          setShowCreateEmployerAccount(true);
          setShowLogIn(false);
        }}
      >
        Create Account
      </button>
    </div>
  );
}
