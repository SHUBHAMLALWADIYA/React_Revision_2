import { createContext, useState } from "react";

export const LoginlogoutContext = createContext();

const LoginlogoutContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <LoginlogoutContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </LoginlogoutContext.Provider>
    </>
  );
};

export default LoginlogoutContextProvider;