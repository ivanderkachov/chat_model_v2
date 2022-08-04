import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginRoute = ({ children }) => {
  const token = useSelector((store) => store.login.token);

  if (token) {
    return <Navigate to="/rooms" replace />;
  }
  return children;
};

export default LoginRoute;
