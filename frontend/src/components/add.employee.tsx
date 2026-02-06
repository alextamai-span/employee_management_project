import React, { useState } from "react";
import { Employee, EmployeeFormData } from "../types/employee.types";
import { addEmployee } from "../services/employee.service";
import { toast } from "react-toastify";
import { useEmployeeValidation } from "../hooks/employee.input.validation";
import { countries } from 'countries-list';


interface AddEmployeePopUpProps {
  onClose: () => void;
  onEmployeeAdded: (employee: Employee) => void;
}

const AddEmployeePopUp: React.FC<AddEmployeePopUpProps> = ({
  onClose,
  onEmployeeAdded,
}) => {
  const [employeeFormData, setEmployeeFormData] = useState<EmployeeFormData>({
    employer_id: "",
    name: "",
    ssn: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation hook
  const { validateEmployeeForm } = useEmployeeValidation(
    employeeFormData,
    setErrors
  );

  // input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeFormData(prev => ({
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

    setEmployeeFormData({ 
      ...employeeFormData,
      ssn: formatted
    });
  };

  // state or country changes
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setEmployeeFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user selects a value
    if (errors[name]) {
      setErrors(prevErrors => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  // submit new employee
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasError = validateEmployeeForm();

    if (!hasError) {
      try {

        const formData = { ...employeeFormData };

        const newEmployee = await addEmployee(formData);
                
        if (newEmployee.success && newEmployee.data) {
          onEmployeeAdded(newEmployee.data);
          onClose();
        }
        else {
          toast.error("Failed to create employee");
        }
      }
      catch {
        toast.error("Failed to create employee");
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
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="employer_id"
            placeholder="Employer ID"
            value={employeeFormData.employer_id}
            onChange={handleChange}/> 
          {errors.employer_id && ( <h4 className="form-invalid">{errors.employer_id}</h4> )}

          <input
            name="name"
            placeholder="Name"
            value={employeeFormData.name}
            onChange={handleChange}/> 
          {errors.name && ( <h4 className="form-invalid">{errors.name}</h4> )}
          
          <input
            name="ssn"
            placeholder="SSN"
            value={employeeFormData.ssn}
            onChange={handleSsnChange} />
          {errors.ssn && ( <h4 className="form-invalid">{errors.ssn}</h4> )}

          <input
            name="address1"
            placeholder="Address 1"
            value={employeeFormData.address1}
            onChange={handleChange} />
          {errors.address1 && ( <h4 className="form-invalid">{errors.address1}</h4> )}

          <input
            name="address2"
            placeholder="Address 2"
            value={employeeFormData.address2}
            onChange={handleChange} />

          <input
            name="city"
            placeholder="City"
            value={employeeFormData.city}
            onChange={handleChange} />
          {errors.city && ( <h4 className="form-invalid">{errors.city}</h4> )}

          <select
            name="state"
            value={employeeFormData.state}
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

          <input
            name="zip"
            placeholder="Zip"
            value={employeeFormData.zip}
            onChange={handleChange} />
          {errors.zip && ( <h4 className="form-invalid">{errors.zip}</h4> )}

          <select
            name="country"
            value={employeeFormData.country}
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
            <button type="submit" className="logInBtn">
              Save
            </button>
            
            <button type="button" className="logInBtn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePopUp;
