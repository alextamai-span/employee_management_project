import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import EmployerLogin from "./pages/employer.login";
import EmployerRegister from "./pages/employer.register";
import EmployeeManagement from "./pages/management";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Navigate to="/employer/login" replace />} />

        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />
        <Route path="/employer/management" element={<EmployeeManagement />} />
      </Routes>
    </>
  );
}

export default App;
