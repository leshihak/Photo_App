import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { ItemGridType } from "../../../models/ui.model";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import ReactPlayer from "react-player/youtube";

interface ItemGridProps {
  items: ItemGridType[];
  type: "images" | "videos" | "saved";
}

const ItemGrid: FC<ItemGridProps> = ({ items, type }) => {
  const renderItemGrid = (item: ItemGridType) => {
    switch (type) {
      case "images":
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

  return (
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
        >
          {renderItemGrid(item)}
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
};

export default ItemGrid;
