import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userEmail, setuserEmail] = useState('');
  const [userRole, setuserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userDecode = jwtDecode(token);        
        setIsAuthenticated(true);
        setUserID(userDecode.identification);
        setuserEmail(userDecode.email);
        setuserRole(userDecode.role);
        setUserToken(token);  
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  return (
    <SessionContext.Provider value={{ isAuthenticated, setIsAuthenticated, userID, userEmail, userRole, isLoading, userToken }}>
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node,
};

export { SessionContext, SessionProvider };
