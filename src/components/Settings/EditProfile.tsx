import { Avatar, Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Loader from "components/UI/Loader/Loader";
import { ModalRootContext } from "components/UI/Modal/ModalRoot/ModalRootContext";
import { Formik } from "formik";
import useCurrentUser from "hooks/useCurrentUser";
import { FC, useContext } from "react";
import { updateUserInDB } from "services/users.service";

const inputStyle = {
  ml: 2,
  input: {
    p: "0 10px",
    height: 32,
    border: "1px solid #dbdbdb",
    borderRadius: "3px",
  },
  "& .MuiOutlinedInput-root": {
    p: "0 10px",
    border: "none",
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  },
};

const EditProfile: FC = () => {
  const currentUser = useCurrentUser();
  const { setModalType } = useContext(ModalRootContext);

  if (!currentUser) {
    return <Loader />;
  }

  const initialValues = {
    uid: currentUser.uid,
    name: currentUser.name,
    username: currentUser.username,
    bio: currentUser.bio ?? null,
    website: currentUser.website ?? null,
    phoneNumber: currentUser.photoURL ?? null,
    email: currentUser.email,
    gender: currentUser.gender ?? null,
    photoURL: currentUser.photoURL,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        updateUserInDB(currentUser.uid, values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, dirty }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                justifyContent="end"
                width={110}
                mr={3}
                sx={{ cursor: "pointer" }}
              >
                <Avatar
                  alt={values.name!!}
                  src={values.photoURL!!}
                  onClick={() => setModalType(2)}
                />
              </Box>
              <Box width={1} minWidth={220}>
                <Typography
                  variant="h6"
                  fontWeight="400"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {values.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => setModalType(2)}
                >
                  Change Profile Photo
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Name
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.name}
                fullWidth
                name="name"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Username
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.username}
                fullWidth
                name="username"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Website
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.website}
                fullWidth
                name="website"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" mt={2} minWidth={370}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Bio
              </Typography>
              <TextField
                multiline
                maxRows={4}
                fullWidth
                value={values.bio}
                name="bio"
                onChange={handleChange}
                sx={{
                  ml: 2,
                  textarea: {
                    p: "0 10px",
                    border: "1px solid #dbdbdb",
                    borderRadius: "3px",
                  },
                  "& .MuiOutlinedInput-root": {
                    p: "0 10px",
                    border: "none",
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  },
                }}
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Email
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.email}
                fullWidth
                name="email"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Phone Number
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.phoneNumber}
                fullWidth
                name="phoneNumber"
                onChange={handleChange}
              />
            </Box>
            <Box display="flex" alignItems="center" mt={2}>
              <Typography align="right" fontWeight="bold" sx={{ width: 110 }}>
                Gender
              </Typography>
              <TextField
                sx={inputStyle}
                value={values.gender}
                name="gender"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting || !dirty}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditProfile;
