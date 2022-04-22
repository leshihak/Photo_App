import { createContext } from "react";

type ModalRootContextType = {
  modalType: number | null;
  setModalType: (value: number | null) => void;
};

export const ModalRootContext = createContext<ModalRootContextType>(null!);
