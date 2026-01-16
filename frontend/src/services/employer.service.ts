import { EmployerFormData } from "../types/employer.types";

interface ServiceResponse {
  success: boolean;
  message: string;
}

export const saveEmployerAccountToDB = async (
  data: EmployerFormData
): Promise<ServiceResponse> => {
  try {
    const response = await fetch("http://localhost:5000/employers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add new employer');
    }

    // get result from the response
    const result = await response.json();
    return {
      success: true,
      message: result.message || "Employer account created successfully!"
    };
  }
  catch (error) {
    console.error("Error saving employer:", error);
    return { 
      success: false, 
      message: "Network error or server unreachable."
    };
  }
};

export const authenticateEmployer = async (
  data: Pick<EmployerFormData, "employerEmail" | "employerPassword"> // only need the email and password for logging in
): Promise<ServiceResponse> => {
  try {
    const response = await fetch("http://localhost:5000/employers/login", {
      method: "POST", // for security and get would have email/password in the url
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    // get result from the response
    const result = await response.json();
    return {
      success: true,
      message: result.message || "Log in successful!"
    };
  }
  catch (error) {
    console.error("Error logging in:", error);
    return { 
      success: false, 
      message: "Invalid email or password."
    };
  }
};
