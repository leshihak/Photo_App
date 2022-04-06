import { Box, Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../ui/Icons/GoogleLogo";

const Auth: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = () =>
    signInWithPopup(auth, provider)
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));

  return (
    <Box
      height="100vh"
      bgcolor="black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button variant="outlined" onClick={handleSignIn}>
        <GoogleLogo />
        <Box pl={1}>Login with Google</Box>
      </Button>
    </Box>
  );
};

export default Auth;
