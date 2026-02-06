import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticateEmployer } from "../services/employer.service";
import { useEmployerLogInValidation } from "../hooks/login.input.validation";

export default function EmployerLogin() {
  const navigate = useNavigate();

  // Form state
  const [loginFormData, setLoginFormData] = useState({
    employerEmail: "",
    employerPassword: ""
  });

  const [errors, setErrors] = useState<any>({});

  // Validation hook
  const { validateEmployerLogIn } = useEmployerLogInValidation(
    {
      employerEmail: loginFormData.employerEmail,
      employerPassword: loginFormData.employerPassword
    },
    setErrors
  );

  // Change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = validateEmployerLogIn();

    if (!hasError) {
      try {
        const result = await authenticateEmployer(loginFormData);

        if (result.success && result.data && result.token) {
          toast.success("Logged in successfully!");
          localStorage.setItem("accessToken", result.token);

          navigate("/employer/management", {
            state: { employerId: result.data, token: result.token }
          });
        }
        else {
          toast.error("Invalid login credentials");
        }
      }
      catch (error) {
        toast.error("Login failed!");
        console.error(error);
      }
    }
    else {
      toast.error("Please fix the errors in the form.");
    }
  };

  return (
    <div className="loginEmployer">
      <h2>Employer Login</h2>
      <p>Sign in to manage your employees</p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="employerEmail"
            value={loginFormData.employerEmail}
            onChange={handleChange}
          />
          {errors.employerEmail && (
            <h4 className="form-invalid">{errors.employerEmail}</h4>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="employerPassword"
            value={loginFormData.employerPassword}
            onChange={handleChange}
          />
          {errors.employerPassword && (
            <h4 className="form-invalid">{errors.employerPassword}</h4>
          )}
        </div>

        <button type="submit" className="logInBtn">Sign In</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/employer/register" className="logInBtn">
        Create Account
      </Link>
    </div>
  );
}
