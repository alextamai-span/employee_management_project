import React, { useState } from "react";
import { Employee } from "../types/employee.types";
import { updateEmployee } from "../services/employee.service";
import { useEmployeeValidation } from "../hooks/employee.input.validation";
import { toast } from "react-toastify";
import { countries } from 'countries-list';

interface EditEmployeePopUpProps {
  employee: Employee;
  onClose: () => void;
  onEmployeeUpdated: (employee: Employee) => void;
  token: string;
}

const EditEmployeePopUp: React.FC<EditEmployeePopUpProps> = ({
  employee,
  onClose,
  token,
  onEmployeeUpdated
}) => {
  const [formData, setFormData] = useState({
    employer_id: employee.employer_id,
    name: employee.name,
    ssn: employee.ssn,
    address1: employee.address1,
    address2: employee.address2,
    city: employee.city,
    state: employee.state,
    zip: employee.zip,
    country: employee.country
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation hook
  const { validateEmployeeForm } = useEmployeeValidation(
    formData,
    setErrors
  );

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

    const hasError = validateEmployeeForm();
    if (!hasError) {
      try {
        const result = await updateEmployee(employee.id, token, formData);

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
    }
    else {
      toast.error("Please fix the errors in the form.");
    }
  };

  // selecting a country
    const countryList = Object.entries(countries).map(([code, country]) => ({
      code,
      name: country.name
    }));

  // selecting a us state
  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
    "DC", "PR", "GU", "VI", "AS", "MP"
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>Edit Employee</h2>

        <form onSubmit={handleSubmit}>
          <input name="employer_id" value={formData.employer_id} onChange={handleChange} />
          {errors.employer_id && ( <h4 className="form-invalid">{errors.employer_id}</h4> )}

          <input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && ( <h4 className="form-invalid">{errors.name}</h4> )}

          <input name="ssn" value={formData.ssn} onChange={handleSsnChange} />
          {errors.ssn && ( <h4 className="form-invalid">{errors.ssn}</h4> )}

          <input name="address1" value={formData.address1} onChange={handleChange} />
          {errors.address1 && ( <h4 className="form-invalid">{errors.address1}</h4> )}

          <input name="address2" value={formData.address2} onChange={handleChange} />

          <input name="city" value={formData.city} onChange={handleChange} />
          {errors.city && ( <h4 className="form-invalid">{errors.city}</h4> )}

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
          {errors.state && ( <h4 className="form-invalid">{errors.state}</h4> )}

          <input name="zip" value={formData.zip} onChange={handleChange} />
          {errors.zip && ( <h4 className="form-invalid">{errors.zip}</h4> )}
          
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
          {errors.country && ( <h4 className="form-invalid">{errors.country}</h4> )}

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
