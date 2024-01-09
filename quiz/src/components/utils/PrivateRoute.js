import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = localStorage.getItem("authToken");
    return isLogin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;