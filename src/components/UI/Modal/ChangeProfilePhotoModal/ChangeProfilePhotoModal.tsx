import { Box, Button, Typography } from "@mui/material";
import useCurrentUser from "hooks/useCurrentUser";
import { FC, useContext } from "react";
import { updateUserInDB } from "services/users.service";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";

const ChangeProfilePhotoModal: FC = () => {
  const currentUser = useCurrentUser();
  const { setModalType } = useContext(ModalRootContext);

  return (
    <Box width="400px" height="238px">
      <Box
        borderBottom="1px solid #dbdbdb"
        display="flex"
        justifyContent="center"
        p={4}
      >
        <Typography sx={{ fontSize: 18 }} fontWeight="bold" align="center">
          Change Profile Photo
        </Typography>
      </Box>
      <Box
        borderBottom="1px solid #dbdbdb"
        display="flex"
        justifyContent="center"
      >
        <Button
          fullWidth
          component="label"
          sx={{
            p: "4px 8px",
            textTransform: "none",
            minHeight: 48,
            fontWeight: 700,
          }}
        >
          <input
            type="file"
            hidden
            accept="image/jpeg,image/png"
            onChange={(event) =>
              updateUserInDB(currentUser?.uid!!, {
                ...currentUser,
                photoURL: URL.createObjectURL(event.target.files?.[0]!!),
              }).then(() => setModalType(null))
            }
          />
          Upload Photo
        </Button>
      </Box>
      <Box
        borderBottom="1px solid #dbdbdb"
        display="flex"
        justifyContent="center"
      >
        <Button
          fullWidth
          sx={{
            p: "4px 8px",
            textTransform: "none",
            minHeight: 48,
            color: "#ed4956",
            fontWeight: 700,
          }}
          onClick={() =>
            updateUserInDB(currentUser?.uid!!, {
              ...currentUser,
              photoURL: null,
            }).then(() => setModalType(null))
          }
        >
          Remove Current Photo
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          fullWidth
          sx={{
            p: "4px 8px",
            textTransform: "none",
            minHeight: 48,
            color: "#262626",
          }}
          onClick={() => setModalType(null)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeProfilePhotoModal;
