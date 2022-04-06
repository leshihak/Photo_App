import { FC, SyntheticEvent } from "react";
import { Tab, Tabs as TabsComponent } from "@mui/material";
import { TabType } from "../../../models/ui.model";

interface TabsProps {
  tabs: TabType[];
  onChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
}

const Tabs: FC<TabsProps> = ({ tabs, value, onChange }) => (
  <TabsComponent
    value={value}
    onChange={onChange}
    centered
    sx={{
      minHeight: "53px",
      borderTop: "1px solid #dbdbdb",
      "& .MuiTabs-indicator": {
        backgroundColor: "black",
        height: "1px",
        top: "0px",
      },
      "& .MuiButtonBase-root.Mui-selected": {
        color: "black",
      },
      button: {
        padding: 0,
        minHeight: "53px",
      },
      svg: {
        width: "12px",
      },
    }}
  >
    {tabs.map((tab) => (
      <Tab
        key={tab.label}
        label={tab.label}
        icon={tab.icon}
        iconPosition="start"
        sx={{
          fontSize: 12,
          color: "#9b908e",
        }}
      />
    ))}
  </TabsComponent>
);

export default Tabs;
