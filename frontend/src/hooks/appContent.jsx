import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [input, setInput] = useState("");
  return (
    <AppContext.Provider value={{ input, setInput }}>
      {children}
    </AppContext.Provider>
  );
};

function useApp() {
  const context = useContext(AppContext);
  return context;
}
export { AppProvider, useApp };
