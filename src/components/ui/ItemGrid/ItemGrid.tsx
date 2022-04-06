import { Grid } from "@mui/material";
import { FC } from "react";
import { ImageType } from "../../../models/ui.model";

interface ItemGridProps {
  items: ImageType[];
}

const ItemGrid: FC<ItemGridProps> = ({ items }) => (
  <Grid item xs={12}>
    <Grid container justifyContent="center" spacing={3.5}>
      {items.map((item) => (
        <Grid key={`${item.alt}-${item.src}`} item>
          <img
            alt={item.alt}
            src={item.src}
            style={{ objectFit: "cover", height: "290px", width: "290px" }}
          />
        </Grid>
      ))}
    </Grid>
  </Grid>
);

export default ItemGrid;
