import { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from "../types/employee.types";
import { ServiceResponse } from "../types/employer.types";

export const fetchEmployees = async (employerId: any): Promise<Employee[]> => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  try {
    const response = await fetch(`http://localhost:5000/employees/list?employerId=${employerId}`, { 
      method: "GET",
      headers: {"Content-Type": "application/json"} 
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    const data = await response.json();
    setEmployees(data); 

    return data;
  }
  catch (err) {
    console.error('Error getting all employees:', err);
    throw err; 
  }
};

export const addEmployee = async (formData: EmployeeFormData, employerId: string): Promise<ServiceResponse> => {
  try {
    const employeeData = {
      ...formData,
      employer_id: employerId
    }

    const response = await fetch(`http://localhost:5000/employees/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
        throw new Error("Failed to add employees");
    }

    const newEmployee = await response.json();
    return {
      success: true,
      message: 'Success',
      data: newEmployee
    }
  }
  catch (err) {
    console.log('Failed to add employee:', err);
    return {
      success: false,
      message: 'Fail'
    }
  }
};

export const updateEmployee = async (
  id: string,
  employeeData: EmployeeFormData
): Promise<ServiceResponse> => {
  try {
    console.log('employee data:', employeeData)
    const response = await fetch(`http://localhost:5000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    

    if (!response.ok) {
      throw new Error("Failed to update employee");
    }

    const data: Employee = await response.json();
    return {
      success: true,
      message: 'Success'
    }
  } catch (err) {
    console.error("Failed to update employee:", err);
    return {
      success: false,
      message: 'Fail'
    }
  }
};

export const deleteEmployee = async (id: string): Promise<ServiceResponse> => {
  const response = await fetch(`http://localhost:5000/employees/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"}
  });

  return response.json();
};