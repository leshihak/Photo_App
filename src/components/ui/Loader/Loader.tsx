import InstagramIcon from "@mui/icons-material/Instagram";
import { Box } from "@mui/material";

const Loader = () => (
  <Box
    width={1}
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <InstagramIcon
      fontSize="large"
      sx={{ color: "#cbcbcb", width: 56, height: 56 }}
    />
  </Box>
);

export default Loader;
