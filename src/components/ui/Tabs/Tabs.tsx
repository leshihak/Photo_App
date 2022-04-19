import { FC, SyntheticEvent } from "react";
import { Tab, Tabs as TabsComponent } from "@mui/material";
import { TabType } from "models/ui.model";

interface TabsProps {
  tabs: TabType[];
  onChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
  orientation: "horizontal" | "vertical";
}

const Tabs: FC<TabsProps> = ({ tabs, value, onChange, orientation }) => (
  <TabsComponent
    orientation={orientation}
    value={value}
    onChange={onChange}
    centered
    sx={{
      minHeight: "53px",
      borderTop: orientation === "vertical" ? "unset" : "1px solid #dbdbdb",
      "& .MuiTabs-indicator": {
        backgroundColor: "black",
        height: "1px",
        top: 0,
        left: 0,
      },
      "& .MuiButtonBase-root.Mui-selected": {
        color: "black",
        fontWeight: orientation === "vertical" ? 600 : 500,
      },
      button: {
        p: orientation === "vertical" ? 2 : 0,
        minHeight: "53px",
        fontSize: orientation === "vertical" ? 16 : 12,
      },
      svg: {
        width: "12px",
      },
    }}
  >
    {tabs.map((tab) => (
      <Tab
        disableRipple
        key={tab.label}
        label={tab.label}
        icon={tab.icon}
        iconPosition="start"
        sx={{
          justifyContent: orientation === "vertical" ? "start" : "center",
          textTransform: "none",
          fontSize: 12,
          color: orientation === "vertical" ? "black" : "#9b908e",
          fontWeight: orientation === "vertical" ? "inherit" : 500,
          "&:active": { opacity: 0.5 },
        }}
      />
    ))}
  </TabsComponent>
);

export default Tabs;
