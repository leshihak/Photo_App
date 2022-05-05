import { Box, Typography } from "@mui/material";
import { FC } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const PostSharedStep: FC = () => (
  <>
    <Box
      borderBottom="1px solid #dbdbdb"
      py={1}
      px={3}
      display="flex"
      justifyContent="center"
    >
      <Typography fontWeight="bold" align="center">
        Post shared
      </Typography>
    </Box>
    <Box
      height={1}
      width={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <CheckCircleOutlineIcon
        sx={{ width: 96, height: 96, color: "#e54c59" }}
      />
      <Typography sx={{ fontSize: 22, my: 2 }} align="center">
        Your post has been shared.
      </Typography>
    </Box>
  </>
);

export default PostSharedStep;
