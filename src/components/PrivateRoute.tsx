import { Navigate, useLocation } from 'react-router-dom';
import React from "react";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuthenticated = localStorage.getItem('jwtToken') !== null;
    const location = useLocation();

    return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;