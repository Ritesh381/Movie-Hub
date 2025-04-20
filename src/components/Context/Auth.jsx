import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("user");
  useEffect(() => {
    const x = localStorage.getItem("authenticated");
    if (JSON.parse(x) === true) {
      setAuthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
  }, [authenticated]);
  
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};
