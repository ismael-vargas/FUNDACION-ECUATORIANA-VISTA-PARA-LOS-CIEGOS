import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { Roles } from '../common/roles';

export const ProtectedRoute = ({ element, requiredRole }) => {
    const { userRole, isAuthenticated, } = useContext(SessionContext);    
    if (![requiredRole, Roles.SUPERADMIN, isAuthenticated].includes(userRole)) {        
        return <Navigate to="/login" />;
      }

    return element;
};
