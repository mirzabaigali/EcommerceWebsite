import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
  };

  useEffect(() => {
    // You can add logic here to check if the user is authenticated, e.g., from a stored token
    // For simplicity, I'm using a local storage example
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contextValue = {
    token,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
