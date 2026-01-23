import React, { useState } from "react";
import { Employee, EmployeeFormData } from "../types/employee.types";
import { addEmployee } from "../services/employee.service";
import { toast } from "react-toastify";
import { useEmployeeValidation } from "../hooks/employee.input.validation";
import { countries } from 'countries-list';


interface AddEmployeePopUpProps {
  onClose: () => void;
  onEmployeeAdded: (employee: Employee) => void;
  employerId: string;
}

const AddEmployeePopUp: React.FC<AddEmployeePopUpProps> = ({
  onClose,
  onEmployeeAdded,
  employerId
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
        const newEmployee = await addEmployee({
          ...employeeFormData,
          employer_id: employerId
          });
        
        if (newEmployee.success && newEmployee.data) {
          toast.success("Employee created");
          onEmployeeAdded(newEmployee.data as Employee);
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
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
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
            onChange={handleChange} />
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
