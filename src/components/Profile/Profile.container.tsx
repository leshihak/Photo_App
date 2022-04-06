import { FC, SyntheticEvent, useState } from "react";
import { TabType } from "../../models/ui.model";
import Profile from "./Profile";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader/Loader";

const ProfileContainer: FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) =>
    setTabValue(newValue);

  if (!user) {
    return <Loader />;
  }

  const TABS: TabType[] = [
    {
      label: "POSTS",
      icon: <GridOnIcon />,
      pathname: `/${user.uid}`,
    },
    {
      label: "VIDEOS",
      icon: <PlayCircleOutlineIcon />,
      pathname: `/${user.uid}/videos`,
    },
    {
      label: "SAVED",
      icon: <BookmarkIcon />,
      pathname: `/${user.uid}/saved`,
    },
  ];

  return (
    <Profile onTabChange={handleTabChange} tabValue={tabValue} tabs={TABS} />
  );
};

export default ProfileContainer;
