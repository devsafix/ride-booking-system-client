import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

interface IProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: IProps) => {
  const user = useSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
