import { FC, useEffect } from "react";
import { setAuthUser } from "store/authSlice";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(setAuthUser(user ? true : false));
  }, [user]);

  return <>Dashboard</>;
};

export default Dashboard;
