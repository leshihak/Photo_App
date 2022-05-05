import { Box, Link, Typography } from "@mui/material";
import { FC } from "react";

const NoMatch: FC = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height={1}
  >
    <Typography variant="h5" fontWeight="bold">
      Sorry, this page isn't available.
    </Typography>
    <Box mt={5}>
      <Typography>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link href="/" underline="none" color="#00376b">
          Go back to Instagram.
        </Link>
      </Typography>
    </Box>
  </Box>
);

export default NoMatch;
