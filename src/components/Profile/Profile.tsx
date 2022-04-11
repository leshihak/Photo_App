import { FC, SyntheticEvent } from "react";
import { PostData, PostType } from "../../models/post.model";
import { TabType } from "../../models/ui.model";
import ItemGrid from "../ui/ItemGrid/ItemGrid";
import Tabs from "../ui/Tabs/Tabs";

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
}) => (
  <>
    <Tabs tabs={tabs} onChange={onTabChange} value={tabValue} />
    {tabValue === 0 && (
      <ItemGrid items={data.images} type="images" onClick={onItemClick} />
    )}
    {tabValue === 1 && (
      <ItemGrid items={data.videos} type="videos" onClick={onItemClick} />
    )}
    {tabValue === 2 && (
      <ItemGrid items={data.saved} type="saved" onClick={onItemClick} />
    )}
  </>
);

export default Profile;
