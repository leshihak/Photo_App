import { User } from "firebase/auth";
import { FC, useEffect } from "react";
import { RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

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
  const { authUser } = useSelector((state: RootState) => state.auth);
  // NEED TO FIX
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authUser);
    if (!authUser) {
      navigate("/login");
      // return <Navigate to="/login" replace />;
    }
  }, [authUser, navigate]);
  // if (!authUser) {
  //   return <Navigate to="/login" replace />;
  // }

  console.log(authUser);

  return children;
};

export default ProtectedRoute;
