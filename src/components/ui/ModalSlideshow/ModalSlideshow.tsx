import { Modal, Box } from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import useKeyPress from "../../../hooks/useKeyPress";
import Post from "../Post/Post";

interface ModalSlideshowProps {
  activeIndex: number;
  data: {
    // NEED TO ADD TYPE
    [key: string]: {
      alt?: string;
      id: string;
      url: string;
    }[];
  };
  openModal: boolean;
  onOpenModal: Dispatch<SetStateAction<boolean>>;
  onActiveIndex: Dispatch<SetStateAction<number>>;
  type: "images" | "videos" | "saved"; // NEED TO ADD TYPE
}

const ModalSlideshow: FC<ModalSlideshowProps> = ({
  data,
  activeIndex,
  openModal,
  onOpenModal,
  onActiveIndex,
  type,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const leftArrowPressed = useKeyPress("ArrowLeft");
  const rightArrowPressed = useKeyPress("ArrowRight");

  const hideRightArrow = activeIndex !== data[type].length - 1;

  const handleCloseModal = () => {
    navigate(`/user/${user?.uid}${type === "images" ? "" : `/${type}`}`);
    onOpenModal(false);
  };

  useEffect(() => {
    if (rightArrowPressed && hideRightArrow) {
      navigate(`/user/${user?.uid}/${type}/${data[type][activeIndex + 1].id}`);
      onActiveIndex((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightArrowPressed, hideRightArrow]);

  useEffect(() => {
    if (leftArrowPressed && activeIndex !== 0) {
      navigate(`/user/${user?.uid}/${type}/${data[type][activeIndex - 1].id}`);
      onActiveIndex((prev) => prev - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftArrowPressed, activeIndex]);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "black",
          opacity: "0.7 !important",
        },
      }}
    >
      <>
        {activeIndex !== 0 && (
          <Box
            position="absolute"
            left="10px"
            top="50%"
            onClick={() => {
              navigate(
                `/user/${user?.uid}/${type}/${data[type][activeIndex - 1].id}`
              );
              onActiveIndex((prev) => prev - 1);
            }}
          >
            <ArrowCircleLeftIcon
              sx={{
                color: "white",
                width: 40,
                height: 40,
                cursor: "pointer",
              }}
            />
          </Box>
        )}
        <Box position="absolute" p={1.5} right={0} onClick={handleCloseModal}>
          <CloseIcon
            sx={{ color: "white", width: 40, height: 40, cursor: "pointer" }}
          />
        </Box>
        <Post user={user} data={data} type={type} activeIndex={activeIndex} />
        {hideRightArrow && (
          <Box
            position="absolute"
            right="10px"
            top="50%"
            onClick={() => {
              navigate(
                `/user/${user?.uid}/${type}/${data[type][activeIndex + 1].id}`
              );
              onActiveIndex((prev) => prev + 1);
            }}
          >
            <ArrowCircleRightIcon
              sx={{
                color: "white",
                width: 40,
                height: 40,
                cursor: "pointer",
              }}
            />
          </Box>
        )}
      </>
    </Modal>
  );
};

export default ModalSlideshow;
