import { Box } from "@mui/material";
import ItemGrid from "components/UI/ItemGrid/ItemGrid";
import Tabs from "components/UI/Tabs/Tabs";
import { PostType, PostData } from "models/post.model";
import { TabType } from "models/ui.model";
import { FC, SyntheticEvent } from "react";
import ProfileInformation from "./ProfileInformation";

interface ProfileProps {
  tabs: TabType[];
  tabValue: number;
  onTabChange: (event: SyntheticEvent, newValue: number) => void;
  onItemClick: (id: string, type: PostType) => void;
  data: PostData;
}

const Profile: FC<ProfileProps> = ({
  onTabChange,
  tabValue,
  tabs,
  onItemClick,
  data,
}) => {
  // console.log(data.photos);
  return (
    <>
      <Box mb={5}>
        <ProfileInformation />
      </Box>
      <Tabs
        tabs={tabs}
        onChange={onTabChange}
        value={tabValue}
        orientation="horizontal"
      />
      {tabValue === 0 && (
        <ItemGrid items={data.photos} type="photos" onClick={onItemClick} />
      )}
      {tabValue === 1 && (
        <ItemGrid items={data.videos} type="videos" onClick={onItemClick} />
      )}
      {tabValue === 2 && (
        <ItemGrid items={data.saved} type="saved" onClick={onItemClick} />
      )}
    </>
  );
};

export default Profile;
