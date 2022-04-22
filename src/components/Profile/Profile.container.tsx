import { FC, SyntheticEvent, useEffect, useState } from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";
import Loader from "components/ui/Loader/Loader";
import { PostType } from "models/post.model";
import { TabType } from "models/ui.model";
import Profile from "./Profile";
import ModalSlideshow from "components/ui/ModalSlideshow/ModalSlideshow";
import usePosts from "hooks/usePosts";
import { getKeyByValue } from "utils/helper";

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
  const posts = usePosts();

  const tabNameToIndex: { [key: number]: string } = {
    0: `/user/${user?.uid}`,
    1: `/user/${user?.uid}/videos`,
    2: `/user/${user?.uid}/saved`,
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState<PostType>("photos");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [tabValue, setTabValue] = useState(
    getKeyByValue(tabNameToIndex, location.pathname) ?? 0
  );

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    navigate(tabNameToIndex[newValue]);
    setTabValue(newValue);
  };

  useEffect(() => {
    const foundElement = posts[selectedType].find(
      (el) => el.id === activeItemId
    );
    if (foundElement) {
      const indexOfFoundElement = posts[selectedType].indexOf(foundElement);
      setActiveItemIndex(indexOfFoundElement);
    }
  }, [activeItemId, selectedType, posts]);

  // NEED TO FIX (CLICK ON PROFILE IMG)
  // useEffect(() => {
  //   setTabValue(indexToTab[location.pathname]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  if (!user) {
    return <Loader />;
  }

  const handleItemClick = (id: string, type: PostType) => {
    navigate(`/user/${user?.uid}/${type}/${id}`);
    setOpenModal(true);
    setSelectedType(type);
    setActiveItemId(id);
  };

  return (
    <>
      <Profile
        onTabChange={handleTabChange}
        tabValue={tabValue}
        tabs={TABS}
        onItemClick={handleItemClick}
        data={posts}
      />
      <ModalSlideshow
        activeIndex={activeItemIndex}
        data={posts}
        openModal={openModal}
        onOpenModal={setOpenModal}
        type={selectedType}
        onActiveIndex={setActiveItemIndex}
      />
    </>
  );
};

export default ProfileContainer;
