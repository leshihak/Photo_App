import { FC, SyntheticEvent } from "react";
import { Tab, Tabs as TabsComponent } from "@mui/material";
import { TabType } from "../../../models/ui.model";

interface TabsProps {
  tabs: TabType[];
  onChange: (event: SyntheticEvent, newValue: number) => void;
  value: number;
}

const Tabs: FC<TabsProps> = ({ tabs, value, onChange }) => {
  return (
    <TabsComponent value={value} onChange={onChange} centered>
      {tabs.map((tab) => (
        <Tab
          key={tab.label}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
        />
      ))}
    </TabsComponent>
  );
};

export default Tabs;
