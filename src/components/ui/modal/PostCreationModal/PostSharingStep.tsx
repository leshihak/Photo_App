import { CircularProgress } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

const PostSharingStep: FC = () => (
  <>
    <Box
      borderBottom="1px solid #dbdbdb"
      py={1}
      px={3}
      display="flex"
      justifyContent="center"
    >
      <Typography fontWeight="bold" align="center">
        Sharing
      </Typography>
    </Box>
    <Box
      height={1}
      width={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  </>
);

export default PostSharingStep;
