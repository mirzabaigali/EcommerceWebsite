// AppContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginOnly, setLoginOnly] = useState(false);

  return (
    <AuthContext.Provider value={{ loginOnly, setLoginOnly }}>
      {children}
    </AuthContext.Provider>
  );
};
