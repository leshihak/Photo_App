import { FC, SyntheticEvent, useEffect, useState } from "react";
import { TabType } from "../../models/ui.model";
import Profile from "./Profile";
import GridOnIcon from "@mui/icons-material/GridOn";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import useAuth from "../../hooks/useAuth";
import Loader from "../ui/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import ModalSlideshow from "../ui/ModalSlideshow/ModalSlideshow";

const data: { [key: string]: { alt?: string; id: string; url: string }[] } = {
  images: [
    {
      alt: "photo1",
      id: "photo1",
      url: "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-ru.jpg",
    },
    {
      alt: "photo2",
      id: "photo2",
      url: "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-photo-effects-ru.jpg",
    },
    {
      alt: "photo3",
      id: "photo3",
      url: "https://mymodernmet.com/wp/wp-content/uploads/2020/12/hobopeeba_118863404_3480621211995541_1845645518254113946_n.jpg",
    },
    {
      alt: "photo4",
      id: "photo4",
      url: "https://i.insider.com/5e458b5796eee652d6773b2a?width=750&format=jpeg&auto=webp",
    },
    {
      alt: "photo5",
      id: "photo5",
      url: "https://www.paperlessmovement.com/wp-content/uploads/2019/09/o2dvsv2pnhe.jpg",
    },
    {
      alt: "photo6",
      id: "photo6",
      url: "https://images.pexels.com/photos/9334434/pexels-photo-9334434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      alt: "photo7",
      id: "photo7",
      url: "https://blog.hootsuite.com/wp-content/uploads/2021/07/free-stock-photos-03-scaled.jpeg",
    },
    {
      alt: "photo8",
      id: "photo8",
      url: "https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg",
    },
    {
      alt: "photo9",
      id: "photo9",
      url: "https://www.photoweb.fr/espaces/magazine/wp-content/uploads/2018/07/comment-ameliorer-photo-en-ligne.jpg",
    },
  ],
  videos: [
    {
      id: "video1",
      url: "https://youtu.be/Q63qjIXMqwU",
    },
  ],
  saved: [
    {
      alt: "photo1",
      id: "photo1",
      url: "https://www.photoweb.fr/espaces/magazine/wp-content/uploads/2018/07/comment-ameliorer-photo-en-ligne.jpg",
    },
  ],
};

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

  const [openModal, setOpenModal] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "images" | "videos" | "saved"
  >("images");
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [tabValue, setTabValue] = useState(indexToTab[location.pathname] ?? 0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    navigate(tabNameToIndex[newValue]);
    setTabValue(newValue);
  };

  useEffect(() => {
    const foundElement = data[selectedType].find(
      (el) => el.id === activeItemId
    );
    if (foundElement) {
      const indexOfFoundElement = data[selectedType].indexOf(foundElement);
      setActiveItemIndex(indexOfFoundElement);
    }
  }, [activeItemId, selectedType]);

  // NEED TO FIX (CLICK ON PROFILE IMG)
  // useEffect(() => {
  //   setTabValue(indexToTab[location.pathname]);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);

  if (!user) {
    return <Loader />;
  }

  const handleItemClick = (id: string, type: "images" | "videos" | "saved") => {
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
        data={data}
      />
      <ModalSlideshow
        activeIndex={activeItemIndex}
        data={data}
        openModal={openModal}
        onOpenModal={setOpenModal}
        type={selectedType}
        onActiveIndex={setActiveItemIndex}
      />
    </>
  );
};

export default ProfileContainer;
