import { Dispatch, FC, SetStateAction, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";
import { User } from "firebase/auth";
import Carousel from "components/ui/Carousel/Carousel";
import MoodIcon from "@mui/icons-material/Mood";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface CreatePostStepProps {
  onSetStep: Dispatch<SetStateAction<number>>;
  files: {
    id: string;
    alt: string;
    url: string;
  }[];
  user: User | null;
  onCreatePost: () => void;
}

const CreatePostStep: FC<CreatePostStepProps> = ({
  onSetStep,
  files,
  user,
  onCreatePost,
}) => {
  const [captionValue, setCaptionValue] = useState("");

  return (
    <>
      <Box
        borderBottom="1px solid #dbdbdb"
        py={1}
        px={3}
        display="flex"
        justifyContent="space-between"
      >
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          onClick={() => onSetStep(1)}
        />
        <Typography fontWeight="bold" align="center">
          Create new post
        </Typography>
        <Button
          variant="text"
          sx={{
            p: 0,
            textTransform: "none",
            color: "#0095f6",
          }}
          onClick={() => {
            onCreatePost();
            onSetStep(3);
          }}
        >
          Share
        </Button>
      </Box>
      <Grid
        container
        position="absolute"
        top="50%"
        left="50%"
        bgcolor="common.white"
        sx={{ transform: "translate(-50%, -50%)" }}
        height={555}
      >
        <Grid
          item
          md={7}
          sx={{
            objectFit: "contain",
            position: "relative",
          }}
        >
          <Carousel items={files} oneItemInArray={files.length === 1} />
        </Grid>
        <Grid item md={5} borderLeft="1px solid #efefef">
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" px={2} pt={2}>
              <Avatar
                alt={user?.displayName!!}
                src={user?.photoURL!!}
                sx={{ width: 32, height: 32 }}
              />
              <Box ml={2}>
                <Typography variant="body2" fontWeight="bold">
                  {user?.displayName}
                </Typography>
              </Box>
            </Box>
            <Box p={2} borderBottom="1px solid #efefef">
              <TextField
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    p: 0,
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  },
                }}
                value={captionValue}
                onChange={(event) => setCaptionValue(event.target.value)}
                multiline
                placeholder="Write a caption..."
                maxRows={7}
                inputProps={{ maxLength: 2200 }}
              />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={1.5}
              >
                <MoodIcon />
                <Typography sx={{ fontSize: 12, color: "#c7c7c7" }}>
                  {captionValue.length}/2,200
                </Typography>
              </Box>
            </Box>
            <Box
              borderBottom="1px solid #efefef"
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              height={45}
            >
              <Typography variant="body1" sx={{ color: "#8e99a7" }}>
                Add location
              </Typography>
              <LocationOnOutlinedIcon />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CreatePostStep;
