import { FC } from "react";
import { Outlet } from "react-router-dom";

const DashboardWrapper: FC = () => (
  <>
    Wrapper
    <Outlet />
    Wrapper
  </>
);

export default DashboardWrapper;
