import { Box } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { TabType } from "../../models/ui.model";
import Tabs from "../ui/Tabs/Tabs";

interface ProfileProps {
  tabs: TabType[];
  tabValue: number;
  onTabChange: (event: SyntheticEvent, newValue: number) => void;
}

const Profile: FC<ProfileProps> = ({ onTabChange, tabValue, tabs }) => {
  return (
    <>
      Profile
      <Box width={1} bgcolor="background.paper">
        <Tabs tabs={tabs} onChange={onTabChange} value={tabValue} />
      </Box>
    </>
  );
};

export default Profile;
