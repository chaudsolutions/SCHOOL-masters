import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { localStorageToken } from "../Hooks/useVariable";

// Create an AuthContext with default value
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [user, setUser] = useState(localStorage.getItem(localStorageToken));

  // Function to log in a user
  const login = (userData) => {
    setUser(userData);

    localStorage.setItem(localStorageToken, JSON.stringify(userData));
  };

  // Function to log out a user
  const logout = () => {
    setUser(null);
    // Clear user data from local storage

    localStorage.removeItem(localStorageToken);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};
