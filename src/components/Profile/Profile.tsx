import { Box } from "@mui/material";
import { FC, SyntheticEvent } from "react";
import { TabType } from "../../models/ui.model";
import ItemGrid from "../ui/ItemGrid/ItemGrid";
import Tabs from "../ui/Tabs/Tabs";

interface ProfileProps {
  tabs: TabType[];
  tabValue: number;
  onTabChange: (event: SyntheticEvent, newValue: number) => void;
}

const DUMMY_IMAGES = [
  {
    alt: "photo1",
    id: "photo1",
    src: "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-AI-photo-enhancement-tool-ru.jpg",
  },
  {
    alt: "photo2",
    id: "photo2",
    src: "https://imgv3.fotor.com/images/homepage-feature-card/Fotor-photo-effects-ru.jpg",
  },
  {
    alt: "photo3",
    id: "photo3",
    src: "https://mymodernmet.com/wp/wp-content/uploads/2020/12/hobopeeba_118863404_3480621211995541_1845645518254113946_n.jpg",
  },
  {
    alt: "photo4",
    id: "photo4",
    src: "https://i.insider.com/5e458b5796eee652d6773b2a?width=750&format=jpeg&auto=webp",
  },
  {
    alt: "photo5",
    id: "photo5",
    src: "https://www.paperlessmovement.com/wp-content/uploads/2019/09/o2dvsv2pnhe.jpg",
  },
  {
    alt: "photo6",
    id: "photo6",
    src: "https://images.pexels.com/photos/9334434/pexels-photo-9334434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    alt: "photo7",
    id: "photo7",
    src: "https://blog.hootsuite.com/wp-content/uploads/2021/07/free-stock-photos-03-scaled.jpeg",
  },
  {
    alt: "photo8",
    id: "photo8",
    src: "https://photo.wondershare.com/images/en/blog/app-to-take-out-photo-background-2.jpg",
  },
  {
    alt: "photo9",
    id: "photo9",
    src: "https://www.photoweb.fr/espaces/magazine/wp-content/uploads/2018/07/comment-ameliorer-photo-en-ligne.jpg",
  },
];

const Profile: FC<ProfileProps> = ({ onTabChange, tabValue, tabs }) => {
  return (
    <>
      <Tabs tabs={tabs} onChange={onTabChange} value={tabValue} />
      <ItemGrid items={DUMMY_IMAGES} />
    </>
  );
};

export default Profile;
