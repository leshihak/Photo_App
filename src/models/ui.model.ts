import { ReactElement } from "react";

export type TabType = {
  label: string;
  icon?: ReactElement | string;
};

export type ItemGridType = {
  url: string;
  id: string;
  alt?: string;
};
