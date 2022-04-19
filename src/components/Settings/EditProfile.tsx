import { Avatar, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Loader from "components/ui/Loader/Loader";
import useAuth from "hooks/useAuth";
import { FC } from "react";

const inputStyle = {
  ml: 2,
  input: {
    p: "0 10px",
    height: 32,
    border: "1px solid #dbdbdb",
    borderRadius: "3px",
  },
  "& .MuiOutlinedInput-root": {
    p: "0 10px",
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
};

const EditProfile: FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Loader />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          justifyContent="end"
          width={110}
          mr={3}
          sx={{ cursor: "pointer" }}
        >
          <Avatar alt={user.displayName!!} src={user.photoURL!!} />
        </Box>
        <Box width={1} minWidth={220}>
          <Typography
            variant="h6"
            fontWeight="400"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user.displayName}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color="primary"
            sx={{ cursor: "pointer" }}
          >
            Change Profile Photo
          </Typography>
        </Box>
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Name
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Username
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Website
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
      <Box display="flex" mt={2} minWidth={370}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Bio
        </Typography>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          sx={{
            ml: 2,
            textarea: {
              height: "60px !important",
              p: "0 10px",
              border: "1px solid #dbdbdb",
              borderRadius: "3px",
            },
            "& .MuiOutlinedInput-root": {
              p: "0 10px",
              border: "none",
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            },
          }}
        />
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Email
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Phone Number
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
      <Box display="flex" mt={2}>
        <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
          Gender
        </Typography>
        <TextField sx={inputStyle} fullWidth />
      </Box>
    </Box>
  );
};

export default EditProfile;
