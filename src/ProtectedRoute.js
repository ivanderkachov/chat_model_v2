import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ children, redirectPath = "/" }) => {
  const token = useSelector((store) => store.login.token);

  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedRoute