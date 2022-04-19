import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const DashboardWrapper: FC = () => (
  <Box height="calc(100vh - 60px)" bgcolor="#fafafa">
    <AppBar />
    <Box
      width={1}
      height="calc(100% - 30px)"
      maxWidth="935px"
      margin="64px auto"
      padding="30px 0"
    >
      <Outlet />
    </Box>
  </Box>
);

export default DashboardWrapper;
