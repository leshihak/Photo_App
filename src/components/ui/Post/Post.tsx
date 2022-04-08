import { Box, Avatar, Typography } from "@mui/material";
import { User } from "firebase/auth";
import { FC } from "react";
import { renderItemGrid } from "../ItemGrid/ItemGrid";
import Loader from "../Loader/Loader";

interface PostProps {
  user: User | null;
  data: {
    [key: string]: {
      alt?: string;
      id: string;
      url: string;
    }[];
  };
  type: "images" | "videos" | "saved";
  activeIndex: number;
}

const Post: FC<PostProps> = ({ user, data, type, activeIndex }) => {
  if (!user?.displayName || !user?.photoURL) {
    return <Loader />;
  }

  return (
    <Box
      display="flex"
      position="absolute"
      top="50%"
      left="50%"
      bgcolor="white"
      sx={{ transform: "translate(-50%, -50%)" }}
      height={1}
      maxHeight="556px"
    >
      <Box
        sx={{
          objectFit: "contain",
          maxWidth: 445,
          position: "relative",
        }}
      >
        {renderItemGrid(data[type][activeIndex], type)}
      </Box>
      <Box borderLeft="1px solid #efefef">
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderBottom="1px solid #efefef"
        >
          <Avatar
            alt={user?.displayName}
            src={user?.photoURL}
            sx={{ width: 32, height: 32 }}
          />
          <Box ml={2}>
            <Typography variant="body2" fontWeight="bold">
              {user.displayName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#8e8e8e" }}>
              Rodatichi, L'Vivs'Ka Oblast', Ukraine
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;
