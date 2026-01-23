import React, { useState } from "react";
import { Employee, EmployeeFormData } from "../types/employee.types";
import { updateEmployee } from "../services/employee.service";
import { toast } from "react-toastify";

interface EditEmployeePopUpProps {
  employee: Employee;
  onClose: () => void;
  onEmployeeUpdated: (employee: Employee) => void;
}

const EditEmployeePopUp: React.FC<EditEmployeePopUpProps> = ({
  employee,
  onClose,
  onEmployeeUpdated
}) => {
  const [formData, setFormData] = useState({
    name: employee.name,
    ssn: employee.ssn,
    address1: employee.address1,
    address2: employee.address2,
    city: employee.city,
    state: employee.state,
    zip: employee.zip,
    country: employee.country
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedEmployee = await updateEmployee(employee.id, formData);

      if (updatedEmployee.success && updatedEmployee.data) {
        toast.success("Employee updated");
        onEmployeeUpdated(updatedEmployee.data as Employee);
      }
      else {
        toast.error("Failed to update employee");
      }
    } catch {
      toast.error("Failed to update employee");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="ssn" value={formData.ssn} onChange={handleChange} />
          <input name="city" value={formData.city} onChange={handleChange} />
          <input name="state" value={formData.state} onChange={handleChange} />
          <input name="zip" value={formData.zip} onChange={handleChange} />
          <input name="country" value={formData.country} onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" className="signInBtn">
              Update
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePopUp;
