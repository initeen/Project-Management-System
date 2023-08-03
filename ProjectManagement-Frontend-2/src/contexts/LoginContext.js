// LoginContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the LoginContext
const LoginContext = createContext();

// Create a custom hook to consume the LoginContext
const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
};

// Create the LoginProvider component
const LoginProvider = ({ children }) => {

  const isLogin =   localStorage.getItem('isLogin');
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin === 'true');

  const handleLogin = () => {
    // Implement your login logic here (e.g., with API calls to the server).
    // For simplicity, we'll assume a successful login.
    setIsLoggedIn(true);
    localStorage.setItem('isLogin', true)
    // You can store additional user data in the context if needed.
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clearing tokens, etc.).
    setIsLoggedIn(false);
    localStorage.removeItem('isLogin')
  };

  const value = {
    isLoggedIn,
    handleLogin,
    handleLogout,
  };

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export { LoginProvider, useLoginContext };
