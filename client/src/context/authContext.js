import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const login = async (input) => {
    const res = await axios.post("/auth/login", input, { withCredentials: true });
    setCurrentUser(res.data);
  };

  const logout = async (input) => {
    await axios.post("/auth/logout", input, {withCredentials: true});
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // split fullname to be like firstName and lastName
  const fullName = currentUser?.userData.full_name;
  const tempArray = currentUser?.userData === undefined ? null : fullName.split(" ");
  const lastName = tempArray === null ? null : tempArray.pop();
  const firstName = tempArray === null ? null : tempArray.join(" ");

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, firstName, lastName }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
