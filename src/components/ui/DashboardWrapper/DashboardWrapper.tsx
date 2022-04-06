import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";

const DashboardWrapper: FC = () => (
  <>
    <AppBar />
    <Box width={1} maxWidth="975px" margin="64px auto" padding="30px 20px 0">
      <Outlet />
    </Box>
  </>
);

export default DashboardWrapper;
