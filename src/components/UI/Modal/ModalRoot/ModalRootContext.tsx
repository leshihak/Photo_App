import { createContext } from "react";
import { Post } from "models/post.model";

type ModalRootContextType = {
  modalType: number | null;
  selectedPost: Post | null;
  setModalType: (value: number | null) => void;
  setSelectedPost: (value: Post | null) => void;
};

export const ModalRootContext = createContext<ModalRootContextType>(null!);
