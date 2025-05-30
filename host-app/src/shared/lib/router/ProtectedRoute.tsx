import type React from "react";
import { Navigate, useLocation } from "react-router";
import { getSessionFromStorage } from "../utils/localStorage";

type Props = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const location = useLocation();
  const session = getSessionFromStorage();

  if (!session) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.role ?? "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
