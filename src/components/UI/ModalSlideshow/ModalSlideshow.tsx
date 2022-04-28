import { Modal, Box } from "@mui/material";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import Post from "../Post/Post";
import useAuth from "hooks/useAuth";
import useKeyPress from "hooks/useKeyPress";
import { PostData, PostType } from "models/post.model";
import { FileTypes } from "static/constants";

interface ModalSlideshowProps {
  activeIndex: number;
  data: PostData;
  openModal: boolean;
  onOpenModal: Dispatch<SetStateAction<boolean>>;
  onActiveIndex: Dispatch<SetStateAction<number>>;
  type: PostType;
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
    navigate(
      `/user/${user?.uid}${type === FileTypes.IMAGES ? "" : `/${type}`}`
    );
    onOpenModal(false);
  };

  useEffect(() => {
    if (rightArrowPressed && hideRightArrow) {
      navigate(`/user/${user?.uid}/${type}/${data[type][activeIndex + 1].uid}`);
      onActiveIndex((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightArrowPressed, hideRightArrow]);

  useEffect(() => {
    if (leftArrowPressed && activeIndex !== 0) {
      navigate(`/user/${user?.uid}/${type}/${data[type][activeIndex - 1].uid}`);
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
                `/user/${user?.uid}/${type}/${data[type][activeIndex - 1].uid}`
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
                `/user/${user?.uid}/${type}/${data[type][activeIndex + 1].uid}`
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
