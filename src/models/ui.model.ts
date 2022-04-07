import { ReactElement } from "react";

export type TabType = {
  label: string;
  icon: ReactElement | string;
  pathname: string;
};

export type ImageType = {
  src: string;
  id: string;
  alt: string;
};
