import { Box, Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import { ImageType } from "../../../models/ui.model";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

interface ItemGridProps {
  items: ImageType[];
}

const ItemGrid: FC<ItemGridProps> = ({ items }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="center" spacing={3.5}>
        {items.map((item) => (
          <Grid
            key={item.id}
            item
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              objectFit: "cover",
              height: "321px", // need to be 293px
              width: "321px", // need to be 293px
              position: "relative",
            }}
          >
            <img
              alt={item.alt}
              src={item.src}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
              }}
            />
            {isHovered && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top="28px"
                width="91%"
                height="91%"
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
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ItemGrid;
