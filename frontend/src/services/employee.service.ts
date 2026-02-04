import { Employee, EmployeeFormData } from "../types/employee.types";
import { ServiceResponse } from "../types/employer.types";

export const fetchEmployees = async (employerId: any): Promise<Employee[]> => {
  try {
    const response = await fetch(`http://localhost:5000/employees/list?employerId=${employerId}`, { 
      method: "GET",
      headers: {"Content-Type": "application/json"} 
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    return await response.json();
  }
  catch (err) {
    console.error('Error getting all employees:', err);
    throw err; 
  }
};

export const addEmployee = async (formData: EmployeeFormData): Promise<ServiceResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/employees/add`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
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
  id: any,
  employeeData: EmployeeFormData
): Promise<ServiceResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/employees/update?employeeId=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to update employee");
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Success',
      data: result
    }
  }
  catch (err) {
    console.error("Failed to update employee:", err);
    return {
      success: false,
      message: 'Fail'
    }
  }
};

export const deleteEmployee = async (
  id: any,
): Promise<ServiceResponse> => {
  try {
    const response = await fetch(`http://localhost:5000/employees/delete?employeeId=${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Success',
      data: result
    }
  }
  catch (err: any) {
    console.error("Failed to delete employee:", err);
    return {
      success: false,
      message: 'Fail'
    }
  }
};