import { Box, Button } from "@mui/material";
import GoogleLogo from "components/UI/Icons/GoogleLogo";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserToDB } from "services/users.service";

const Auth: FC = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;
        navigate("/");
        setUserToDB(user.uid, {
          id: user.uid,
          photoURL: user.photoURL,
          name: user.displayName,
          username: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          bio: null,
          gender: null,
        });
      })
      .catch((error) => toast.error(error.message));

  return (
    <Box
      height="100vh"
      bgcolor="common.black"
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
