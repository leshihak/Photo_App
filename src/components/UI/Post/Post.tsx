import {
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { User } from "firebase/auth";
import { FC, useContext, useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { PostData, PostType } from "models/post.model";
import { renderItemGrid } from "../ItemGrid/ItemGrid";
import Loader from "../Loader/Loader";
import { setCommentToPost, toggleLikeToPost } from "services/posts.service";
import { db } from "config/firebase";
import { onValue } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { ref } from "firebase/database";
import { differenceInMinutes, format } from "date-fns";
import { ModalRootContext } from "../Modal/ModalRoot/ModalRootContext";
import usePostComments from "hooks/usePostComments";
import { differenceInSeconds } from "date-fns/esm";
import useKeyPress from "hooks/useKeyPress";

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
  const post = data[type][activeIndex];

  const inputRef = useRef<HTMLDivElement>(null);
  const { comments } = usePostComments(post.uid);
  const enterPressed = useKeyPress("Enter");
  const [commentValue, setCommentValue] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const { setModalType, setSelectedPost } = useContext(ModalRootContext);

  useEffect(() => {
    onValue(
      ref(
        db,
        `${DataBaseModel.POSTS}/${user?.uid}/photos/${post.uid}/userIdsWhoLikedPost/${user?.uid}`
      ),
      (snapshot) => setIsLiked(Boolean(snapshot.val()))
    );
  }, [post.uid, user]);

  if (!user) {
    return <Loader />;
  }

  const handleSubmit = () => {
    setCommentToPost(user.uid, post.uid, commentValue);
    setCommentValue("");
  };

  return (
    <Grid
      container
      position="absolute"
      top="50%"
      left="50%"
      bgcolor="common.white"
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
        {renderItemGrid(post, type)}
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
              alt={user.displayName!!}
              src={user.photoURL!!}
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
          <Box
            p={2}
            maxHeight={600}
            sx={{
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {comments.map((comment) => {
              const createdAt =
                differenceInMinutes(new Date(), new Date(comment.createdAt)) ===
                0
                  ? `${differenceInSeconds(
                      new Date(),
                      new Date(comment.createdAt)
                    )}
            s`
                  : `${differenceInMinutes(
                      new Date(),
                      new Date(comment.createdAt)
                    )}
              m`;

              return (
                <Box
                  display="flex"
                  alignItems="center"
                  px={2}
                  py={1}
                  key={comment.uid}
                >
                  <Avatar
                    alt={undefined}
                    src={undefined}
                    sx={{ width: 44, height: 44 }}
                  />
                  <Box
                    display="inline-block"
                    ml={2}
                    sx={{ wordBreak: "break-all" }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      nataliia.leshchak
                    </Typography>
                    <Box display="inline">
                      <span>{comment.text}</span>
                    </Box>
                    <Box display="flex" mt={2} mb={0.5}>
                      <Typography
                        sx={{ fontSize: 12, color: "#8e8e8e", mr: 2 }}
                      >
                        {createdAt}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12, color: "#8e8e8e" }}
                        fontWeight="bold"
                      >
                        Reply
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={1}
              borderTop="1px solid #efefef"
            >
              <Box>
                <span
                  onClick={() => toggleLikeToPost(user.uid, post.uid, isLiked)}
                >
                  {isLiked ? (
                    <FavoriteIcon
                      sx={{ m: 1, cursor: "pointer", color: "red" }}
                    />
                  ) : (
                    <FavoriteBorderIcon sx={iconStyle} />
                  )}
                </span>
                <ChatBubbleOutlineIcon
                  sx={iconStyle}
                  onClick={() => inputRef.current?.focus()}
                />
                <SendOutlinedIcon sx={iconStyle} />
              </Box>
              <Box>
                <BookmarkBorderOutlinedIcon sx={iconStyle} />
              </Box>
            </Box>
            <Box px={2}>
              <Typography variant="body2">
                {post.userIdsWhoLikedPost === undefined ? (
                  <>
                    Be the first to
                    <span
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() =>
                        toggleLikeToPost(user.uid, post.uid, isLiked)
                      }
                    >
                      &nbsp;like this
                    </span>
                  </>
                ) : (
                  <span
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPost(post);
                      setModalType(1);
                    }}
                  >
                    {Object.keys(post.userIdsWhoLikedPost).length}&nbsp;like
                  </span>
                )}
              </Typography>
            </Box>
            <Box px={2}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 10,
                  color: "#8e8e8e",
                  textTransform: "uppercase",
                }}
              >
                {format(new Date(post.createdAt), "LLLL d")}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderTop="1px solid #efefef"
              px={2}
              py={0.5}
              mt={2}
              minHeight={53}
            >
              <EmojiEmotionsOutlinedIcon />
              <TextField
                inputRef={inputRef}
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
                maxRows={5}
                onKeyPress={() => (enterPressed ? handleSubmit() : null)}
              />
              <Button
                type="submit"
                variant="text"
                color="primary"
                disabled={commentValue.trim().length === 0}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Post;
