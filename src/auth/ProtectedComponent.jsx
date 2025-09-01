import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { Roles } from "../common/roles";


export const ProtectedComponent = ({ children, requiredRole }) => {
    const { userRole } = useContext(SessionContext);
  
  if (![requiredRole, Roles.SUPERADMIN].includes(userRole)) {
    console.log('No autorizado');
    return <Navigate to="/login" />;
  }

  return children;
};
