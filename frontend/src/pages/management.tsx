import React, { useState, useEffect } from "react";
import { fetchEmployees, deleteEmployee } from "../services/employee.service";
import { Employee } from "../types/employee.types";
import { toast } from "react-toastify";
import '../App.css'
import { useNavigate, useLocation } from "react-router-dom";

import AddEmployeePopUp from '../components/add.employee';
import EditEmployeePopUp from "../components/edit.employee";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state.employerId;
  const token = location.state.token;

  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditEmployeePopUp, setshowEditEmployeePopUp] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // get the employees that work for the employer
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const allEmployees = await fetchEmployees(employerId, token);

        setEmployees(allEmployees);
      }
      catch (error) {
        toast.error("Failed to load employees");
      }
    };

    loadEmployees();

  }, [employerId, token]); // Runs whenever employerId changes

  // employee has been added
  const handleNewEmployee = async () => {
    try {
      // Re-fetch the updated list from the server
      const data = await fetchEmployees(employerId, token);

      setEmployees(data);
      
      // Close the popup
      setShowAddPopUp(false);
    }
    catch (error) {
      toast.error("Employee was added, but the list failed to refresh.");
    }
  };

  // delete an employee
  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id, token);
      setEmployees(prev => prev.filter((emp: any) => emp.id !== id));
      toast.success("Employee deleted");
    }
    catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/employer/login");
  };

  return (
    <div>
      <header>
        <h1>Employee Management System</h1>

        <button
          className="signInBtn"
          onClick={() => setShowAddPopUp(true)}
        >
          Add Employee
        </button>

        <button
          className="signInBtn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <table>
        {/* header row */}
        <thead>
          <tr>
            <th>Employer ID</th>
            <th>Name</th>
            <th>SSN</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Country</th>
            <th>Actions</th> 
          </tr>
        </thead>
        
        {/* data rows */}
        <tbody>
          { employees.length > 0 ? (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employer_id}</td>
                <td>{emp.name}</td>
                <td>{emp.ssn}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zip}</td>
                <td>{emp.country}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setshowEditEmployeePopUp(true);
                    }}
                  >
                    <img src="/edit.png" alt="Edit" />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(emp.id)}
                  >
                    <img src="/trash.png" alt="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No employees yet. Click "Add Employee" to create one.
              </td>
            </tr>

          )}
        </tbody>
      </table>

      <div> 
        {showAddPopUp && (
          <AddEmployeePopUp
            key={employerId}
            token={token}
            onClose={() => setShowAddPopUp(false)}
            onEmployeeAdded={handleNewEmployee}
          />
        )}

        {showEditEmployeePopUp && selectedEmployee && (
          <EditEmployeePopUp
            employee={selectedEmployee}
            token={token}
            onClose={() => {
              setshowEditEmployeePopUp(false);
              setSelectedEmployee(null);
            }}
            onEmployeeUpdated={(updatedEmployee: Employee) =>
              setEmployees(prev =>
                prev.map(emp =>
                  emp.id === updatedEmployee.id ? updatedEmployee : emp
                )
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeManagement;