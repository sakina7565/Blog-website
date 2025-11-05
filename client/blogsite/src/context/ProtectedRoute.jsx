import { Navigate } from "react-router-dom";
import { userData } from "./UserDataContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, role } = userData();

  // Check if user exists and has valid role
  if (!user || !role) {
    return <Navigate to="/" replace />;
  }

  // Normalize roles for comparison
  const normalizedUserRole = role.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map((r) => r.toLowerCase());

  if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
