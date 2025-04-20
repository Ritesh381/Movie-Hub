import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("")
  useEffect(() => {
    const x = localStorage.getItem("authenticated");
    setUsername(localStorage.getItem("username"))
    setEmail(localStorage.getItem("email"))
    if (JSON.parse(x) === true) {
      setAuthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("authenticated", JSON.stringify(authenticated));
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  }, [authenticated, username, email]);
  
  
  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, username, setUsername, email, setEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};
