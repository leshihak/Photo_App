import { Box, Typography } from "@mui/material";
import { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ReactPlayer from "react-player/youtube";
import { Post, PostType } from "models/post.model";

interface ItemGridProps {
  items: Post[];
  type: PostType;
  onClick: (id: string, type: PostType) => void;
}

export const renderItemGrid = (item: Post, type: PostType) => {
  switch (type) {
    case "photos":
      return (
        <img
          alt={item.alt}
          src={item.url}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      );
    case "videos":
      return <ReactPlayer url={item.url} width="100%" height="100%" />;
    case "saved":
      return (
        <img
          alt={item.alt}
          src={item.url}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      );

    default:
      break;
  }
};

const ItemGrid: FC<ItemGridProps> = ({ items, type, onClick }) => (
  <Box display="flex" flexWrap="wrap" justifyContent="space-between">
    {items.map((item) => (
      <Box
        key={item.uid}
        mb={4}
        sx={{
          objectFit: "cover",
          height: "293px",
          width: "293px",
          position: "relative",
          "&:hover .hidden-block": {
            display: "flex",
            cursor: "pointer",
          },
        }}
        onClick={() => onClick(item.uid, type)}
      >
        {renderItemGrid(item, type)}
        <Box
          display="none"
          className="hidden-block"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          top={0}
          width={1}
          height={1}
          sx={{ backgroundColor: "rgb(58 58 58 / 59%)" }}
        >
          {item.userIdsWhoLikedPost !== undefined && (
            <Box display="flex" alignItems="center" mr={3}>
              <FavoriteIcon sx={{ color: "white", mr: 0.5 }} />
              <Typography
                align="center"
                variant="body2"
                fontWeight="bold"
                sx={{ color: "white" }}
              >
                {Object.keys(item.userIdsWhoLikedPost).length}
              </Typography>
            </Box>
          )}
          <Box display="flex" alignItems="center">
            <ChatBubbleIcon sx={{ color: "white", mr: 0.5 }} />
            <Typography
              align="center"
              variant="body2"
              fontWeight="bold"
              sx={{ color: "white" }}
            >
              {item.comments ? item.comments.length : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

export default ItemGrid;
