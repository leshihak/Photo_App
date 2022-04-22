import { Box, Typography } from "@mui/material";
import { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ReactPlayer from "react-player/youtube";
import { PostType } from "models/post.model";
import { ItemGridType } from "models/ui.model";

interface ItemGridProps {
  items: ItemGridType[];
  type: PostType;
  onClick: (id: string, type: PostType) => void;
}

export const renderItemGrid = (item: ItemGridType, type: PostType) => {
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
        key={item.id}
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
        onClick={() => onClick(item.id, type)}
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
          <Box display="flex" alignItems="center">
            <FavoriteIcon sx={{ color: "white", mr: 0.5 }} />
            <Typography
              align="center"
              variant="body2"
              fontWeight="bold"
              sx={{ color: "white" }}
            >
              19
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" ml={3}>
            <ChatBubbleIcon sx={{ color: "white", mr: 0.5 }} />
            <Typography
              align="center"
              variant="body2"
              fontWeight="bold"
              sx={{ color: "white" }}
            >
              0
            </Typography>
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

export default ItemGrid;
