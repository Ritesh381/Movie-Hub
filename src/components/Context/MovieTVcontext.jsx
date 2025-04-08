import { createContext, useState } from "react";

export const MySwitchContext = createContext();

export const MySwitchProvider = ({ children }) => {
  const [switchmov, setSwitch] = useState("movie");

  return (
    <MySwitchContext.Provider value={{ switchmov, setSwitch }}>
      {children}
    </MySwitchContext.Provider>
  );
};
