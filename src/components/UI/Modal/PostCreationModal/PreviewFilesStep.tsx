import { Box, Typography, Button } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Carousel from "components/UI/Carousel/Carousel";

interface PreviewFilesStepProps {
  onSetStep: Dispatch<SetStateAction<number>>;
  files: {
    id: string;
    alt: string;
    url: string;
  }[];
}

const PreviewFilesStep: FC<PreviewFilesStepProps> = ({ onSetStep, files }) => (
  <>
    <Box
      borderBottom="1px solid #dbdbdb"
      py={1}
      px={3}
      display="flex"
      justifyContent="space-between"
    >
      <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => onSetStep(0)} />
      <Typography fontWeight="bold" align="center">
        Crop
      </Typography>
      <Button
        variant="text"
        sx={{
          p: 0,
          textTransform: "none",
          color: "#0095f6",
        }}
        onClick={() => onSetStep(2)}
      >
        Next
      </Button>
    </Box>
    <Carousel items={files} oneItemInArray={files.length === 1} />
  </>
);

export default PreviewFilesStep;
