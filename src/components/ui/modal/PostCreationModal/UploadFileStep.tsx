import { Box, Typography, Button } from "@mui/material";
import ImagesAndVideosIcon from "components/ui/Icons/ImagesAndVideosIcon";
import { FC } from "react";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";

interface UploadFileStepProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
}

const UploadFileStep: FC<UploadFileStepProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
}) => (
  <>
    <Box borderBottom="1px solid #dbdbdb" py={1} px={3}>
      <Typography fontWeight="bold" align="center">
        Create new post
      </Typography>
    </Box>
    <Box
      {...getRootProps()}
      p={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="348px"
    >
      <ImagesAndVideosIcon currentColor={isDragActive ? "#0095f6" : "unset"} />
      <Typography sx={{ fontSize: 22, mt: 2 }}>
        Drag photos and videos here
      </Typography>
      <Button
        component="label"
        variant="contained"
        sx={{
          textTransform: "none",
          mt: 3,
          p: "3px 9px",
          backgroundColor: "#0095f6",
        }}
      >
        <Box>
          <input
            {...getInputProps()}
            accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"
          />
          Select from computer
        </Box>
      </Button>
    </Box>
  </>
);

export default UploadFileStep;
