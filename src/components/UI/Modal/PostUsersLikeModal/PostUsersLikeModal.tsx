import { Avatar, Box, Typography } from "@mui/material";
import { db } from "config/firebase";
import { onValue, ref } from "firebase/database";
import useAuth from "hooks/useAuth";
import { DataBaseModel } from "models/service.model";
import { UserType } from "models/user.model";
import { FC, useContext, useEffect, useState } from "react";
import { ModalRootContext } from "../ModalRoot/ModalRootContext";

const PostUsersLikeModal: FC = () => {
  const { user } = useAuth();
  const { selectedPost } = useContext(ModalRootContext);

  const [usersState, setUsersState] = useState<{
    users: UserType[];
    isLoading: boolean;
  }>({ users: [], isLoading: true });

  useEffect(() => {
    onValue(
      ref(
        db,
        `${DataBaseModel.POSTS}/${user?.uid}/photos/${selectedPost?.uid}/userIdsWhoLikedPost`
      ),
      (snapshot) => {
        if (snapshot.val()) {
          Object.keys(snapshot.val()!!).forEach((key) =>
            onValue(ref(db, `${DataBaseModel.USERS}/${key}`), (snapshot) =>
              setUsersState((prevState) => ({
                isLoading: false,
                users: [...prevState.users, snapshot.val()],
              }))
            )
          );
        }
      }
    );
  }, [selectedPost?.uid, user]);

  return (
    <Box width="400px" height="405px" borderRadius="12px" overflow="hidden">
      <Box borderBottom="1px solid #dbdbdb" py={1}>
        <Typography fontWeight="bold" align="center">
          Likes
        </Typography>
      </Box>
      <Box height="364px" overflow="hidden auto">
        {usersState.isLoading
          ? Array(4)
              .fill(1)
              .map((_, index) => (
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  key={index}
                >
                  <Avatar
                    alt={undefined}
                    src={undefined}
                    sx={{ width: 44, height: 44 }}
                  />
                  <Box ml={2}>
                    <Box height="14px" width="100px" bgcolor="lightgray" />
                    <Box
                      height="14px"
                      width="100px"
                      bgcolor="lightgray"
                      mt={1}
                    />
                  </Box>
                </Box>
              ))
          : usersState.users.map((user) => (
              <Box
                display="flex"
                alignItems="center"
                px={2}
                py={1}
                key={user.id}
              >
                <Avatar
                  alt={user.name!!}
                  src={user.photoURL!!}
                  sx={{ width: 44, height: 44 }}
                />
                <Box ml={2}>
                  <Typography variant="body2" fontWeight="bold">
                    {user.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#8e8e8e" }}>
                    {user.username}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  );
};

export default PostUsersLikeModal;
