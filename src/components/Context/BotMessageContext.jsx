import { createContext, useState } from "react";

export const MyBotContext = createContext();

export const MyBotProvider = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState([]);

  return (
    <MyBotContext.Provider value={{ messageHistory, setMessageHistory }}>
      {children}
    </MyBotContext.Provider>
  );
};
