import { FC, SyntheticEvent, useState } from "react";
import { TabType } from "../../models/ui.model";
import Profile from "./Profile";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const TABS: TabType[] = [
  {
    label: "POSTS",
    icon: <GridOnIcon />,
  },
  {
    label: "VIDEOS",
    icon: <PlayCircleOutlineIcon />,
  },
  {
    label: "SAVED",
    icon: <BookmarkIcon />,
  },
];

const ProfileContainer: FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) =>
    setTabValue(newValue);

  return (
    <Profile onTabChange={handleTabChange} tabValue={tabValue} tabs={TABS} />
  );
};

export default ProfileContainer;
