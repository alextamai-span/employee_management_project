import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  // declare state variables for form validations
  const [companyValidation, setCompanyValidation] = useState(null);
  const [contactPersonValidation, setContactPersonValidation] = useState(null);
  const [emailValidation, setEmailValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(null);
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(null);

  return (
    <>
      <div className="createEmployerAccount">
        <h2>Create Employer Account</h2>
        <p>Register as an employer to manage employees</p>
        <form>
          <div>
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" name="companyName" required />
            { companyValidation && <h4 className="form-invalid">{companyValidation}</h4> }
          </div>
          <div>
            <label htmlFor="contactPerson">Contact Person:</label>
            <input type="text" id="contactPerson" name="contactPerson" required />
            { contactPersonValidation && <h4 className="form-invalid">{contactPersonValidation}</h4> }
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required />
            { emailValidation && <h4 className="form-invalid">{emailValidation}</h4> }
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            { passwordValidation && <h4 className="form-invalid">{passwordValidation}</h4> }
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
            { confirmPasswordValidation && <h4 className="form-invalid">{confirmPasswordValidation}</h4> }
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" required />
            { phoneNumberValidation && <h4 className="form-invalid">{phoneNumberValidation}</h4> }
          </div>
          <button type="submit">Create Account</button>
        </form>
        <label htmlFor="alreadyHaveAccount">Already have an account?</label>
        <button id="alreadyHaveAccount">Sign In</button>
      </div>
      
      <div className="logInPage">
        <h2>Please Provide Login Credentials</h2>
        <p>Access your employer dashboard</p>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div>
        <header>
          <h1>Task Manager</h1>
        </header>

      </div>
    </>
  )
}

export default App
