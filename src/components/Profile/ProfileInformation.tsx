import { Avatar, Box, Button, Typography } from "@mui/material";
import Loader from "components/ui/Loader/Loader";
import useAuth from "hooks/useAuth";
import { FC } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

const ProfileInformation: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.displayName || !user.photoURL) {
    return <Loader />;
  }

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center" maxWidth={275} width={1}>
        <Avatar
          alt={user.displayName}
          src={user.photoURL}
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      <Box width={1}>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              fontSize: 28,
              maxWidth: 350,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {user.displayName}
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "common.black",
              border: "1px solid #dbdbdb",
              height: 30,
              textTransform: "none",
              maxWidth: 95,
              fontWeight: 600,
              padding: "5px 9px",
              mx: 2,
              "&:hover": { border: "1px solid #dbdbdb" },
            }}
            onClick={() => navigate("edit")}
          >
            Edit Profile
          </Button>
          <SettingsOutlinedIcon sx={{ cursor: "pointer" }} />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          mt={2}
          maxWidth={350}
          width={1}
        >
          <Box display="flex">
            <Typography fontWeight="bold">18</Typography>&nbsp;posts
          </Box>
          <Box display="flex">
            <Typography fontWeight="bold">98</Typography>&nbsp;followers
          </Box>
          <Box display="flex">
            <Typography fontWeight="bold">11</Typography>&nbsp;following
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" mt={2}>
          <Box display="flex">
            <Typography>🌎 Visited 18 countries</Typography>
          </Box>
          <Box display="flex">
            <Typography>💻 Software Developer</Typography>
          </Box>
          <Box display="flex">
            <Typography>📷 Photography</Typography>
          </Box>
          <Box display="flex">
            <Typography>👌 Volunteering</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
