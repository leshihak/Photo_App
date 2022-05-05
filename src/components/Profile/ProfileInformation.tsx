import { Avatar, Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "hooks/useCurrentUser";

const ProfileInformation: FC = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="center" maxWidth={275} width={1}>
        <Avatar
          alt={currentUser.name!!}
          src={currentUser.photoURL!!}
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
            {currentUser.name}
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
            onClick={() => navigate("/accounts/edit")}
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
            <Typography fontWeight="bold">{currentUser.username}</Typography>
          </Box>
          <Box
            dangerouslySetInnerHTML={{
              __html: currentUser.bio
                ? currentUser.bio.replace(/\n\r?/g, "<br />")
                : "",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInformation;
