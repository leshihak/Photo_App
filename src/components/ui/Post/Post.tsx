import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { User } from "firebase/auth";
import { FC, useState } from "react";
import { renderItemGrid } from "../ItemGrid/ItemGrid";
import Loader from "../Loader/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { PostData, PostType } from "../../../models/post.model";

interface PostProps {
  user: User | null;
  data: PostData;
  type: PostType;
  activeIndex: number;
}

const iconStyle = {
  m: 1,
  cursor: "pointer",
  "&:hover": { color: "#c6c6c6" },
};
const Post: FC<PostProps> = ({ user, data, type, activeIndex }) => {
  const [commentValue, setCommentValue] = useState("");

  if (!user?.displayName || !user?.photoURL) {
    return <Loader />;
  }

  return (
    <Grid
      container
      position="absolute"
      top="50%"
      left="50%"
      bgcolor="white"
      sx={{ transform: "translate(-50%, -50%)" }}
      height={1}
      maxHeight={840}
      maxWidth={1200}
    >
      <Grid
        item
        md={7}
        maxHeight={840}
        sx={{
          objectFit: "contain",
          position: "relative",
        }}
      >
        {renderItemGrid(data[type][activeIndex], type)}
      </Grid>
      <Grid item md={5} borderLeft="1px solid #efefef">
        <Box
          display="flex"
          flexDirection="column"
          height={1}
          justifyContent="space-between"
        >
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
          <Box p={2} height={200}>
            comments
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            px={1}
            borderTop="1px solid #efefef"
          >
            <Box>
              <FavoriteBorderIcon sx={iconStyle} />
              <ChatBubbleOutlineIcon sx={iconStyle} />
              <SendOutlinedIcon sx={iconStyle} />
            </Box>
            <Box>
              <BookmarkBorderOutlinedIcon sx={iconStyle} />
            </Box>
          </Box>
          <Box px={2}>
            <Typography variant="body2">
              Liked by oliynyk.vitaliy and 18 others
            </Typography>
          </Box>
          <Box p={2} borderBottom="1px solid #efefef">
            <Typography
              variant="caption"
              sx={{
                fontSize: 10,
                color: "#8e8e8e",
                textTransform: "uppercase",
              }}
            >
              JANUARY 20
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={2}
            height={53}
          >
            <EmojiEmotionsOutlinedIcon />
            <TextField
              fullWidth
              sx={{
                ml: 2,
                "& .MuiOutlinedInput-root": {
                  p: 0,
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                },
              }}
              value={commentValue}
              onChange={(event) => setCommentValue(event.target.value)}
              multiline
              placeholder="Add a comment..."
              maxRows={4}
            />
            <Button
              type="submit"
              variant="text"
              color="primary"
              disabled={commentValue.trim().length === 0}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Post;