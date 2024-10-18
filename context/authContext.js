import { useContext, useEffect, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    // onAuthStateChanged
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email, password) => {
    try {
      // login logic here
    } catch (e) {
      // handle error
    }
  };

  const logout = async () => {
    try {
      // logout logic here
    } catch (e) {
      // handle error
    }
  };

  const register = async (email, password, firstName, lastName, birthdate, age, sex, contactNumber) => {
    try {
      // registration logic here
    } catch (e) {
      // handle error
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be wrapped inside AuthContextProvider');
  }

  return value;
};