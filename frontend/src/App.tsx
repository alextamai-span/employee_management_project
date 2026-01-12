import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

function App() {
  // declare state variables for form validations
  const [employerFormData, setEmployerFormData] = useState({
    employerCompanyName: "",
    employerContactPerson: "",
    employerEmail: "",
    employerPassword: "",
    employerConfirmPassword: "",
    employerPhoneNumber: ""
  });

  // pop up variables
  const [showCreateEmployerAccount, setShowCreateEmployerAccount] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  // validation errors
  const [errors, setErrors] = useState<any>({});

  // handling new employer form changes
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

  // Validation function
  const validateEmployerForm = () => {
    const newErrors: any = {};
    let hasError = false;

    // Company Name validation
    if (!employerFormData.employerCompanyName.trim()) {
      newErrors.employerCompanyName = "Company Name is required.";
      hasError = true;
    }
    else if (employerFormData.employerCompanyName.length < 2 || employerFormData.employerCompanyName.length > 50) {
      newErrors.employerCompanyName = 'Company Name must be 2-50 characters long.';
      hasError = true;
    }
    else {
      newErrors.employerCompanyName = '';
    }

    // Contact Person validation
    const contactPersonRegex = /^[A-Za-z\s]{2,50}$/;
    if (!employerFormData.employerContactPerson.trim()) {
      newErrors.employerContactPerson = 'Contact Person is required.';
      hasError = true;
    }
    else if (!contactPersonRegex.test(employerFormData.employerContactPerson)) {
      newErrors.employerContactPerson = 'Contact Person must be 2-50 characters long and contain only letters and spaces.';
      hasError = true;
    }
    else {
      newErrors.employerContactPerson = '';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employerFormData.employerEmail.trim()) {
      newErrors.employerEmail = 'Email is required.';
      hasError = true;
    }
    else if (!emailRegex.test(employerFormData.employerEmail)) {
      newErrors.employerEmail = 'Email is not valid.';
      hasError = true;
    }
    else {
      newErrors.employerEmail = '';
    }

    // Password validation
    if (!employerFormData.employerPassword) {
      newErrors.employerPassword = 'Password is required.';
      hasError = true;
    }
    else if (employerFormData.employerPassword.length < 8) {
      newErrors.employerPassword = 'Password must be at least 8 characters long.';
      hasError = true;
    }
    else {
      newErrors.employerPassword = '';
    }

    // Confirm Password validation
    if (!employerFormData.employerConfirmPassword) {
      newErrors.employerConfirmPassword = 'Confirm Password is required.';
      hasError = true;
    }
    else if (employerFormData.employerConfirmPassword !== employerFormData.employerPassword) {
      newErrors.employerConfirmPassword = 'Passwords do not match.';
      hasError = true;
    }
    else {
      newErrors.employerConfirmPassword = '';
    }

    // Phone validation
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!employerFormData.employerPhoneNumber.trim()) {
      newErrors.employerPhoneNumber = 'Phone is required.';
      hasError = true;
    }
    else if (!phoneRegex.test(employerFormData.employerPhoneNumber)) {
      newErrors.employerPhoneNumber = 'Phone number is not valid';
      hasError = true;
    }
    else {
      newErrors.employerPhoneNumber = '';
    }

    setErrors(newErrors);
    return hasError;
  };

  // handling new employer submissions 
  const handleEmployerSubmit = (e: any) => {
    e.preventDefault();
    
    // validate form
    const hasError = validateEmployerForm();

    if (!hasError) {
      toast.success("Employer account created successfully!");
      
      setEmployerFormData({
        employerCompanyName: "",
        employerContactPerson: "",
        employerEmail: "",
        employerPassword: "",
        employerConfirmPassword: "",
        employerPhoneNumber: ""
      });

      // save employer account to database
      saveEmployerAccountToDB();
    }
    else {
      return;
    }
  };

  // save create employer account to database 
  // -- need to replace with actual API call --
  const saveEmployerAccountToDB = async () => {
    console.log("Saving to DB:", employerFormData);
    // Actual API call would go here
  }

  // handling employer log in submissions 
  const handleLogInSubmit = (e: any) => {
    e.preventDefault();
    
    // validate form
    const hasError = validateEmployerForm();

    if (!hasError) {
      toast.success("Logged in successfully!");
      
      setEmployerFormData({
        employerCompanyName: "",
        employerContactPerson: "",
        employerEmail: "",
        employerPassword: "",
        employerConfirmPassword: "",
        employerPhoneNumber: ""
      });

      // authenticate employer
      authenticateEmployer();
    }
    else {
      return;
    }
  };

  // authenticate employer
  // -- need to replace with actual API call --
  const authenticateEmployer = async () => {
    console.log("Authenticating:", employerFormData);
    // Actual API call would go here
  }

  return (
    <>
      <ToastContainer />

      {showCreateEmployerAccount && (
        <div className="createEmployerAccount">
          <h2>Create Employer Account</h2>
          <p>Register as an employer to manage employees</p>

          <form id="employerForm" onSubmit={handleEmployerSubmit}>
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" name="companyName" value={employerFormData.employerCompanyName} onChange={handleEmployerChange} />
              { errors.employerCompanyName && <h4 className="form-invalid">{errors.employerCompanyName}</h4> }
            </div>
            <div>
              <label htmlFor="contactPerson">Contact Person:</label>
              <input type="text" id="contactPerson" name="contactPerson" value={employerFormData.employerContactPerson} onChange={handleEmployerChange} />
              { errors.employerContactPerson && <h4 className="form-invalid">{errors.employerContactPerson}</h4> }
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={employerFormData.employerEmail} onChange={handleEmployerChange} />
              { errors.employerEmail && <h4 className="form-invalid">{errors.employerEmail}</h4> }
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={employerFormData.employerPassword} onChange={handleEmployerChange} />
              { errors.employerPassword && <h4 className="form-invalid">{errors.employerPassword}</h4> }
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={employerFormData.employerConfirmPassword} onChange={handleEmployerChange} />
              { errors.employerConfirmPassword && <h4 className="form-invalid">{errors.employerConfirmPassword}</h4> }
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input type="text" id="phoneNumber" name="phoneNumber" value={employerFormData.employerPhoneNumber} onChange={handleEmployerChange} />
              { errors.employerPhoneNumber && <h4 className="form-invalid">{errors.employerPhoneNumber}</h4> }
            </div>
            <button type="submit">Create Account</button>
          </form>

          <label htmlFor="alreadyHaveAccount">Already have an account?</label>
          <button
            type="button"
            onClick={() => {
              setShowCreateEmployerAccount(false);
              setShowLogIn(true);
            }}>Sign In
          </button>
        </div>
      )}
      
      {showLogIn && (
        <div className="logInPage">
          <h2>Please Provide Login Credentials</h2>
          <p>Access your employer dashboard</p>

          <form id="logInForm" onSubmit={handleLogInSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" value={employerFormData.employerEmail} />
              { errors.employerEmail && <h4 className="form-invalid">{errors.employerEmail}</h4> }
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={employerFormData.employerPassword} />
              { errors.employerPassword && <h4 className="form-invalid">{errors.employerPassword}</h4> }
            </div>

            <button type="submit">Sign In</button>
          </form>
        </div>
      )}

      <div>
        <header>
          <h1>Employee Management System</h1>
          <button type="button" className="signInBtn"
            onClick={() => setShowCreateEmployerAccount(!showCreateEmployerAccount)}>
              {showCreateEmployerAccount ? "Sign Out" : "Sign In"}
          </button>
        </header>

      </div>
    </>
  )
}

export default App
