import { createContext, useState } from "react";

const DropdownContext = createContext();

const DropdownProvider = ({ children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ dropdownOpen, setDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  );
};

export { DropdownContext, DropdownProvider }
