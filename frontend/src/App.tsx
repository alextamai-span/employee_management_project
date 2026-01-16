import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hooks
import { useEmployerForm } from "./hooks/employer.form";
import { useEmployerValidation } from "./hooks/employer.input.validation";
import { useEmployerLogInValidation } from "./hooks/login.input.validation";

// Components
import EmployerRegister from "./components/employer.register";
import EmployerLogin from "./components/employer.login";

// Services - APIs
import { saveEmployerAccountToDB, authenticateEmployer } from "./services/employer.service";

// Types
import { EmployerFormData, EmployerFormErrors } from "./types/employer.types";

function App() {
  // Form state and hooks
  const { employerFormData, setEmployerFormData, errors, setErrors, handleEmployerChange } = useEmployerForm();
  const { validateEmployerForm } = useEmployerValidation(employerFormData, setErrors);

  // Popup visibility
  const [showCreateEmployerAccount, setShowCreateEmployerAccount] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  // Reset form
  const resetForm = () => {
    setEmployerFormData({
      employerCompanyName: "",
      employerContactPerson: "",
      employerEmail: "",
      employerPassword: "",
      employerConfirmPassword: "",
      employerPhoneNumber: "",
    });
  };

  // Employer registration submission
  const handleEmployerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run validation from hook
    const hasError = validateEmployerForm();

    if (!hasError) {
      try {
        // Success toast
        toast.success("Employer account created successfully!");  
        // Save employer account
        await saveEmployerAccountToDB(employerFormData); 

        // Reset form
        resetForm();
        setShowCreateEmployerAccount(false);
      }
      catch (error) {
        toast.error("Failed to create employer account!");
        console.error(error);
      }
    }
    else {
      toast.error("Employer account was not created successfully!")
      return;
    }
  };

  // handling the log in input 
  const handleLogInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEmployerFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Employer login submission
  const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { validateEmployerLogIn } = useEmployerLogInValidation(
      { employerEmail: employerFormData.employerEmail,
        employerPassword: employerFormData.employerPassword },
      setErrors
    );

    const hasError = validateEmployerLogIn();

    if (!hasError) {
      try {
        const loginData = {
          employerEmail: employerFormData.employerEmail,
          employerPassword: employerFormData.employerPassword,
        };
        // save to database
        const result  = await authenticateEmployer(loginData);

        if (result.success) {
          // log in successful
          toast.success("Logged in successfully!");
        }
        else {
          // log in failed
          toast.error(result.message);
        }

        // reset form
        resetForm();
        setShowLogIn(false);
      } 
      catch (error) {
        // log in unsuccessful 
        toast.error("Login failed!");
        console.error(error);
      }
    }
    else {
      // log in unsuccessful
      toast.error("Log in was unsuccessful!")
      return;
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Employer Registration Popup */}
      {showCreateEmployerAccount && (
        <EmployerRegister
          employerFormData={employerFormData}
          errors={errors}
          handleEmployerChange={handleEmployerChange}
          handleEmployerSubmit={handleEmployerSubmit}
          setShowCreateEmployerAccount={setShowCreateEmployerAccount}
        />
      )}

      {/* Employer Login Popup */}
      {showLogIn && (
        <EmployerLogin
          employerFormData={employerFormData}
          errors={errors}
          handleLogInChange={handleLogInChange}
          handleLogInSubmit={handleLogInSubmit}
          setShowCreateEmployerAccount={setShowCreateEmployerAccount}
          setShowLogIn={setShowLogIn}
        />
      )}

      {/* Main Page Header */}
      <div>
        <header>
          <h1>Employee Management System</h1>

          <button
            type="button"
            className="signInBtn"
            onClick={() => {
              setShowLogIn(!showLogIn)
            }} >
            {showLogIn ? "Sign Out" : "Sign In"}
          </button>

        </header>

        <main>
          {/* Future content for employee/employer dashboard goes here */}
        </main>
      </div>
    </>
  );
}

export default App;
