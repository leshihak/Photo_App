import { FC } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const DashboardWrapper: FC = () => (
  <>
    <AppBar />
    <Outlet />
  </>
);

export default DashboardWrapper;
