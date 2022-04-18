import { Box, Typography, Button } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface PreviewFilesStepProps {
  onSetStep: Dispatch<SetStateAction<number>>;
}

const PreviewFilesStep: FC<PreviewFilesStepProps> = ({ onSetStep }) => (
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
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="348px"
    >
      test
    </Box>
  </>
);

export default PreviewFilesStep;
