import React, { useState } from "react";
import { Employee } from "../types/employee.types";
import { updateEmployee } from "../services/employee.service";
import { toast } from "react-toastify";
import { countries } from 'countries-list';

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

  // ssn changes
  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    
    let formatted = '';
    if (value.length > 0) {
      formatted = value.slice(0, 3);
    }
    if (value.length >= 4) {
      formatted += '-' + value.slice(3, 5);
    }
    if (value.length >= 6) {
      formatted += '-' + value.slice(5, 9);
    }

    setFormData({ 
      ...formData,
      ssn: formatted
    });
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateEmployee(employee.id, formData);

      if (result.success) {
        toast.success("Employee updated");
        
        let updatedRecord;

        if (result.data && result.data.id) {
          updatedRecord = result.data;
        }
        else {
          updatedRecord = { 
            ...employee, 
            ...formData 
          };
        }

        onEmployeeUpdated(updatedRecord as Employee);
        onClose();
      }
      else {
        toast.error("Failed to update: " + result.message);
      }
    }
    catch {
      toast.error("Failed to update employee");
    }
  };

  // selecting a country
    const countryList = Object.entries(countries).map(([code, country]) => ({
      code,
      name: country.name
    }));

  // selecting a us state
  const US_STATES = [
    "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
    "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
    "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
    "Maine","Maryland","Massachusetts","Michigan","Minnesota",
    "Mississippi","Missouri","Montana","Nebraska","Nevada",
    "New Hampshire","New Jersey","New Mexico","New York",
    "North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
    "Pennsylvania","Rhode Island","South Carolina","South Dakota",
    "Tennessee","Texas","Utah","Vermont","Virginia","Washington",
    "West Virginia","Wisconsin","Wyoming"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} />
          <input name="ssn" value={formData.ssn} onChange={handleSsnChange} />
          <input name="address1" value={formData.address1} onChange={handleChange} />
          <input name="address2" value={formData.address2} onChange={handleChange} />
          <input name="city" value={formData.city} onChange={handleChange} />
          <select
            name="state"
            value={formData.state}
            onChange={handleSelectionChange}
          >
            <option value="">Select State</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <input name="zip" value={formData.zip} onChange={handleChange} />
          <select
            name="country"
            value={formData.country}
            onChange={handleSelectionChange}
          >
            <option value="">Select Country</option>
            {countryList.map(country => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>

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
