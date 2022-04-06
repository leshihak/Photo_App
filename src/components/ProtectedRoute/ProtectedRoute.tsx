import { User } from "firebase/auth";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: User | null;
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
