import React, { createContext, useContext, useState, useEffect } from "react";
import { EmployerProfile } from "../types/employer.types";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  user: EmployerProfile | null;
  login: (token: string, userData: EmployerProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("employerToken"));
  const [user, setUser] = useState<EmployerProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!token);

  // checks if a user is still in storage after stepping away
  useEffect(() => {
    const savedUser = localStorage.getItem("employerUser");

    if (savedUser && savedUser !== "undefined") {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // new user and creates all needed things
  const login = (newToken: string, userData: EmployerProfile) => {
    localStorage.setItem("employerToken", newToken);
    localStorage.setItem("employerUser", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);
  };

  // trashes everything
  const logout = () => {
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employerUser");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    // provider protects the data being returned
    <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// checks who is logged in
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};