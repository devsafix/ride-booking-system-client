import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role as AppRole } from "@/constants/role";
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import Unauthorized from "@/pages/Unauthorized";

interface AuthWrapperProps {
  requiredRole: "rider" | "driver" | "admin";
}

const AuthWrapper = ({ requiredRole }: AuthWrapperProps) => {
  const user = useSelector(selectCurrentUser);

  // If the user is not authenticated, redirect to the login page.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's role matches the required role.
  if (requiredRole && user.role !== AppRole[requiredRole]) {
    // If the role does not match, navigate to an unauthorized page.
    return <Unauthorized />;
  }

  // If authenticated and authorized, render the DashboardLayout with nested routes.
  return <DashboardLayout />;
};

export default AuthWrapper;
