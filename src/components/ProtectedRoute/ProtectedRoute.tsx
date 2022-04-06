import { User } from "firebase/auth";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  user: User | null;
  isLoading: boolean;
  children: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  user,
  isLoading,
}) => {
  if (!user && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
