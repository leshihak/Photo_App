import { FC, SyntheticEvent, useState } from "react";
import { TabType } from "../../models/ui.model";
import Profile from "./Profile";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabNameToIndex: { [key: number]: string } = {
    0: `/user/${user?.uid}`,
    1: `/user/${user?.uid}/videos`,
    2: `/user/${user?.uid}/saved`,
  };

  const indexToTab: { [key: string]: number } = {
    [`/user/${user?.uid}`]: 0,
    [`/user/${user?.uid}/videos`]: 1,
    [`/user/${user?.uid}/saved`]: 2,
  };

  const [tabValue, setTabValue] = useState(indexToTab[location.pathname] ?? 0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    navigate(tabNameToIndex[newValue]);
    setTabValue(newValue);
  };

  // NEED TO FIX (CLICK ON PROFILE IMG)
  // useEffect(() => {
  //   setTabValue(indexToTab[location.pathname]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  if (!user) {
    return <Loader />;
  }

  return (
    <Profile onTabChange={handleTabChange} tabValue={tabValue} tabs={TABS} />
  );
};

export default ProfileContainer;
