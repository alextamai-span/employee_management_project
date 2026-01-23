import React, { useState, useEffect } from "react";
import { fetchEmployees, deleteEmployee } from "../services/employee.service";
import { Employee } from "../types/employee.types";
import { toast } from "react-toastify";
import '../App.css'
import { useNavigate, useLocation } from "react-router-dom";

import AddEmployeePopUp from '../components/add.employee'
import EditEmployeePopUp from "../components/edit.employee";
import { useEmployeeValidation } from "../hooks/employee.input.validation";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state.employerId;

  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // get the employees that work for the employer
  useEffect( () => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(employerId);
        //setEmployees(data);
      }
      catch (error) {
        toast.error("Failed to load employees");
      }
    };

    loadEmployees();
  }, [employerId]); // Runs whenever employerId changes
  
  
  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees(prev => [newEmployee, ...prev]);
    setShowAddPopUp(false);
  };

  // delete an employee
  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
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
                      setShowEditPopUp(true);
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
              <td colSpan={7} style={{ textAlign: "center" }}>
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
            employerId={employerId}
            onClose={() => setShowAddPopUp(false)}
            onEmployeeAdded={handleEmployeeAdded}
          />
        )}

        {showEditPopUp && selectedEmployee && (
          <EditEmployeePopUp
            employee={selectedEmployee}
            onClose={() => {
              setShowEditPopUp(false);
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